export default (state) => {
  const {newResult = []} = state
  let count = 0;
  let valid = 0
return `
    <!doctype html>
    <html>
       <head>
          <meta charset="utf-8">
          <title>PDF Result Template</title>
          <style>
            .table {
              margin: 0 auto;
              font-size: 12px;
              border-collapse: collapse;
            }
            .table__row {
              border-bottom: 1px solid #cccccc!important;
            }
            .table__column {
              padding: 5px;
            }
          </style>
       </head>
       <body>
          <h1>Отчет</h1>
          <table class="table">
            <thead>
              <tr class="table__row">
                <td class="table__column">Название</td>
                <td class="table__column">Время проведения</td>
                <td class="table__column">ФИО</td>
                <td class="table__column">Уважительно</td>
              </tr>
            </thead>
            <tbody>
                    
            ${newResult.map(({ Название, Время_проведение, ФИО, Уважительно }) => {
              count++;
              Уважительно === 1 ? valid ++ : valid;
              return `<tr class="table__row">
                <td class="table__column">${Название}</td>
                <td class="table__column">${Время_проведение}</td>
                <td class="table__column">${ФИО}</td>
                <td class="table__column">${Уважительно === 0 ? '-' : '+'}</td>
              </tr>
              `
              }
            )}
            <tr class="table__row">
              <td class="table__column">Итого</td>
              <td class="table__column">${count}</td>
              <td class="table__column"></td>
              <td class="table__column"></td>
            </tr>
            <tr class="table__row">
              <td class="table__column">Уважительно</td>
              <td class="table__column">${valid}</td>
              <td class="table__column"></td>
              <td class="table__column"></td>
            </tr>
          </table>
       </body>
    </html>
    `;
}