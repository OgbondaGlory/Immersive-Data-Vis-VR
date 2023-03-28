document.getElementById("refresh-button").addEventListener("click", fetchTables);

function fetchTables() {
  fetch("php/fetch_tables.php")
    .then((response) => response.json())
    .then((data) => {
      data.sort((a, b) => new Date(b.created_at) - new Date(a.created_at));

      const tableList = document.getElementById("tableList");
      let tableContent = `
        <table class="table-list">
          <thead>
            <tr>
              <th>Name</th>
              <th>Date</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
      `;

      data.forEach((item) => {
        tableContent += `
          <tr>
            <td>${item.name}</td>
            <td>${new Date(item.created_at).toLocaleDateString()}</td>
            <td><button class="run-button" data-table-name="${item.name}">Run</button></td>
          </tr>
        `;
      });

      tableContent += `
          </tbody>
        </table>
      `;

      tableList.innerHTML = tableContent;

      document.querySelectorAll('.run-button').forEach(button => {
        button.addEventListener('click', (event) => {
          const tableName = event.target.getAttribute('data-table-name');
          fetchTableData(tableName, event)
            .then(tableData => {
              const axes = determineAxes(tableData);
              update3DBarChart(tableData, axes);
            });
        });
      });
    })
    .catch((error) => {
      console.error("Error fetching table list:", error);
    });
}

fetchTables();

function determineAxes(tableData) {
  const columns = Object.keys(tableData[0]);
  let numericalColumns = [];
  let categoricalColumns = [];

  for (const column of columns) {
    if (!isNaN(parseFloat(tableData[0][column]))) {
      numericalColumns.push(column);
    } else {
      categoricalColumns.push(column);
    }
  }

  const axes = {
    x: categoricalColumns[Math.floor(Math.random() * categoricalColumns.length)],
    y: numericalColumns[Math.floor(Math.random() * numericalColumns.length)],
  };

  return axes;
}







function fetchTableData(tableName, event) {
  const selectedTableDiv = document.getElementById("selected-table");
  selectedTableDiv.textContent = tableName;

  const rows = document.querySelectorAll('#tableList tbody tr');
  rows.forEach((row) => row.classList.remove('selected'));

  event.target.closest('tr').classList.add('selected');

  return fetch(`php/fetch_table_data.php?table_name=${tableName}`)
    .then((response) => response.json())
    .then((data) => {
      const boxContent = document.querySelector("#box4 .box-content");
      let tableContent = `
        <table class="table-data">
          <thead>
            <tr>
      `;

      if (data.length > 0) {
        for (const columnName in data[0]) {
          tableContent += `<th>${columnName}</th>`;
        }
      }

      tableContent += `
            </tr>
          </thead>
          <tbody>
      `;

      for (let i = 0; i < Math.min(5, data.length); i++) {
        const row = data[i];
        tableContent += `<tr>`;
        for (const columnName in row) {
          tableContent += `<td>${row[columnName]}</td>`;
        }
        tableContent += `</tr>`;
      }

      tableContent += `
          </tbody>
        </table>
      `;


      boxContent.innerHTML = tableContent;
      return data;

    })
    .catch((error) => {
      console.error("Error fetching table data:", error);
      
    });
}
document.querySelectorAll('.run-button').forEach(button => {
  button.addEventListener('click', (event) => {
    const tableName = event.target.getAttribute('data-table-name');
    fetchTableData(tableName, event)
      .then(tableData => {
        const axes = determineAxes(tableData);
        update3DBarChart(tableData, axes); // Use the correct function name here
      });
  });
});









// Lets Play and Build a model here 
function predictAxes(data, targetColumn) {
  // Step 1: Preprocess the dataset
  // Example: Remove rows with missing data
  data = data.filter(row => Object.values(row).every(value => value !== null && value !== undefined));

  // Step 2: Feature selection
  const features = Object.keys(data[0]).filter(column => column !== targetColumn);
  let relevantFeatures = [];

  for (const feature of features) {
    // Example: Perform correlation analysis to identify the most relevant features
    const correlation = pearsonCorrelation(data.map(row => row[feature]), data.map(row => row[targetColumn]));
    if (correlation > 0.5) {
      relevantFeatures.push(feature);
    }
  }

  // Step 3: Regression analysis
  const X = data.map(row => relevantFeatures.map(feature => row[feature]));
  const y = data.map(row => row[targetColumn]);

  // Example: Fit a linear regression model
  const model = new LinearRegression();
  model.fit(X, y);

  // Step 4: Evaluate the model
  const {mse, rSquared} = evaluateModel(data, targetColumn, relevantFeatures, model.coef_);

  // Step 5: Use the model
  const importantFeatures = [];
  let xAxisFound = false;
  let zAxisFound = false;

  for (const [index, feature] of relevantFeatures.entries()) {
    // Example: Calculate the feature importance or coefficient
    const importance = model.coef_[index];
    if (importance > 0.1) {
      if (!xAxisFound) {
        importantFeatures.push({name: feature, importance});
        xAxisFound = true;
      } else if (!zAxisFound) {
        importantFeatures.push({name: feature, importance});
        zAxisFound = true;
      } else {
        break;
      }
    }
  }

  // Example: Set the best axes based on the most important features
  let axes = {x: '', y: targetColumn, z: ''};
  if (importantFeatures.length === 1) {
    axes.x = importantFeatures[0].name;
  } else if (importantFeatures.length > 1) {
    axes.x = importantFeatures[0].name;
    axes.z = importantFeatures[1].name;
  }

  return axes;
}

class LinearRegression {
  // Example: Custom implementation of the linear regression algorithm
  // or we can implement the LinearRegression class that uses the gradient descent algorithm to fit a linear regression model

  constructor() {
    this.coef_ = null;
    this.intercept_ = null;
    this.learningRate = 0.01;
    this.nIterations = 1000;
  }

  fit(X, y) {
    const nSamples = X.length;
    const nFeatures = X[0].length;

    this.coef_ = new Array(nFeatures).fill(0);
    this.intercept_ = 0;

    for (let i = 0; i < this.nIterations; i++) {
      const yPred = this.predict(X);
      const error = yPred.map((yp, j) => yp - y[j]);
      const grad = new Array(nFeatures + 1).fill(0);

      for (let j = 0; j < nFeatures; j++) {
        const feature = X.map(row => row[j]);
        grad[j] = 2 * dot(feature, error) / nSamples;
      }

      grad[nFeatures] = 2 * mean(error);

      for (let j = 0; j < nFeatures + 1; j++) {
        this.coef_[j] -= this.learningRate * grad[j];
      }
    }
  }

  predict(X) {
    const yPred = X.map(row => dot(row, this.coef_) + this.intercept_);
    return yPred;
  }
}

function evaluateModel(data, targetColumn, features, coefficients) {
  // Example: Calculate mean squared error and R-squared
  const X = data.map(row => features.map(feature => row[feature]));
  const y = data.map(row => row[targetColumn]);
  const yPred = X.map(row => dot(row, coefficients));
  const mse = meanSquaredError(y, yPred);
  const rSquared = rSquared(y, yPred);
  return {mse, rSquared};
}

function dot(X, Y) {
  return X.reduce((total, x, i) => total + x * Y[i], 0);
}

function meanSquaredError(yTrue, yPred) {
  const squaredErrors = yTrue.map((y, i) => Math.pow(y - yPred[i], 2));
  const mse = squaredErrors.reduce((total, error) => total + error, 0) / yTrue.length;
  return mse;
}

function rSquared(yTrue, yPred) {
  const yMean = mean(yTrue);
  const ssTotal = yTrue.reduce((total, y) => total + Math.pow(y - yMean, 2), 0);
  const ssResidual = yTrue.reduce((total, y, i) => total + Math.pow(y - yPred[i], 2), 0);
  const rSquared = 1 - (ssResidual / ssTotal);
  return rSquared;
  }
  
  function mean(values) {
  return values.reduce((total, value) => total + value, 0) / values.length;
  }
  
  function pearsonCorrelation(X, Y) {
  const Xmean = mean(X);
  const Ymean = mean(Y);
  const numerator = X.reduce((total, x, i) => total + ((x - Xmean) * (Y[i] - Ymean)), 0);
  const denominatorX = X.reduce((total, x) => total + Math.pow(x - Xmean, 2), 0);
  const denominatorY = Y.reduce((total, y) => total + Math.pow(y - Ymean, 2), 0);
  const denominator = Math.sqrt(denominatorX * denominatorY);
  const correlation = numerator / denominator;
  return correlation;
  }
