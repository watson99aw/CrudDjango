let dataTable;
let dataTableisInitialized = false;

const dataTableOptions = {
    columsDefs: [
        { classNames: 'centered', targets: [0, 1, 2, 3, 4, 5, 6] },
        {orderable: false, targets: [5, 6]},
        {searchable: false, targets: [1,2,3,4]}
    ],
    pageLenght: 4,
    destroy: true
}

const initDatatable = async () => {
    if (dataTableisInitialized) {
        dataTable.destroy();
    }

    await listProgrammers();
    dataTable = $('#datatable_programmers').DataTable({

    });
    dataTableisInitialized = true;
}

const listProgrammers = async () => {
    try {
        const response = await fetch('http://127.0.0.1:8000/app/list_programmers/');
        const data = await response.json();
        let content = ``;
        data.programmers.forEach((programmer, index) => {
            content += `
          <tr>
            <td>${index + 1}</td>
            <td>${programmer.name}</td>
            <td>${programmer.country}</td>
            <td>${programmer.birthday}</td>
            <td>${programmer.score}</td>
            <td>${programmer.score >= 8 
                ? "<i class='fa-solid fa-check' style='color: green;'></i>" 
                : "<i class='fa-solid fa-xmark' style='color: red;'></i>"}
            </td>
            <td>
                <button class='btn btn-sm btn-primary'><i class='fa-solid fa-pencil'></i></button>
                <button class='btn btn-sm btn-danger'><i class='fa-solid fa-trash-can'></i></button>
            </td>
          </tr>
        `;

        });
        document.getElementById('tablebody_programmers').innerHTML = content;
    }
    catch (ex) {
        alert(ex);
    }
}

window.addEventListener('load', async () => {
    await initDatatable();
});
