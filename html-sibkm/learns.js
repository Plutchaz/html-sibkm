$(document).ready(function () {
    $("button").click(function () {
        $("#PokemonType").hide();
    });
});

$("#judul").on('click', function () {
    $('#judul').html("berubah")
})

// $.ajax({
//     url: "https://pokeapi.co/api/v2/pokemon/",
//     success: function (result) {
//         let textTemp = "";
//         $.each(result.results, function (key, val) {
//             textTemp += `<tr>
//                         <td>${key + 1}</td>
//                         <td>${val.name}</td>
//                         <td><button class="btn btn-primary" onclick="detailModal('${val.url}')" data-bs-toggle="modal" data-bs-target="#modalDetailPoke">Detail</button></td>
//                         </tr>`
//         })
//         $("tbody").html(textTemp);
//     }
// })

function detailModal(urlList) {
    console.log(urlList);

    $.ajax({
        url: urlList
    }).done((result) => {
        let textTemp = "";
        let pokeType = "";
        $("h1.modal-title").html(result.name + " details");
        textTemp += `<img src="${result.sprites.front_default}" alt="${result.name}" style="width: 175px; height: 175px;" class="text-center">
                    <h1 id="poke-name" class="text-center">${result.name}</h1>
                    <li>Order: ${result.order}</li>
                    <li>Height: ${result.height}</li>
                    <li>Weight: ${result.weight}</li>
                    <li>Base EXP: ${result.base_experience}
                    <span class="bar"><span class="EXP"></span></span>
                    </li>`

        pokeType += `<p>Type: </p>`
        for (let i in result.types) {
            pokeType += `<p>Type : ${result.types[0].type.name}</p>`
        }
        $(".modal-body").html(textTemp, pokeType)
    })
}

//document ready function() -- class
$(document).ready(function () {
    $("#tablePokeId").DataTable({
        "ajax": {
            "url": "https://pokeapi.co/api/v2/pokemon/",
            dataSrc: "results",
            dataType: "JSON",

        },
        //untuk ngecek data
        "columns": [
            {
                //nomor
                // "targets": [0], 'type': 'num',
                // render: DataTable.render.number(',', '.', 1, '', '')
                "data": null,
                "sortable": false,
                render: function (data, type, row, meta) {
                    return meta.row + meta.settings._iDisplayStart + 1;
                }

            },
            {
                "data": "name"
            },
            {
                "data": "url",
                render: function (data, type, row) {
                    return `<button class="btn btn-primary" onclick="detailModal('${data}')" data-bs-toggle="modal" data-bs-target="#modalDetailPoke">Detail</button>`;
                }
            },
        ],
        dom: 'Bfrtip',
        buttons: [
            'csv', 'excel', 'pdf','print'
        ]
    });
});
