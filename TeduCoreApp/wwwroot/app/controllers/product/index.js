var productController = function () {
    this.initialize = function () {
        loadData();
        registerEvents();
    }
    function registerEvents() {
        //Todo Binding events to controls
        $('#ddlShowPage').on('change', function () {
            shophoa.configs.pageSize = $(this).val();
            shophoa.configs.pageIndex = 1;
            loadData(true);
        });
    }
    function loadData(isPageChanged) {
        var template = $('#table-template').html();
        var render = "";
        $.ajax({
            type: 'GET',
            data: {
              
                categoryId: null,
                keyword: $('#txtKeyword').val(),
                page: shophoa.configs.pageIndex,
                pageSize: shophoa.configs.pageSize
            },
            url: '/admin/product/GetAllPaging',
            dataType: 'json',
            success: function (response) {
                console.log(response);
                $.each(response.Results, function (i, item) {
                    render += Mustache.render(template, {
                        Id: item.Id,
                        Name: item.Name,
                        Image: item.Image == null ? '<img src="/admin-side/images/user.png" width=25' : '<img src="' + item.Image + '" width=25 />',
                        CategoryName: item.ProductCategory.Name,
                        Price: shophoa.formatNumber(item.Price, 0),
                        CreatedDate: shophoa.dateTimeFormatJson(item.DateCreated),
                        Status: shophoa.getStatus(item.Status)
                    });
                    $('#lblTotalRecords').text(response.RowCount);
                    if (render != '') {
                        $('#tbl-content').html(render);
                    }
                    wrapPaging(response.RowCount, function () {
                        loadData();
                    }, isPageChanged);
                });
            },
            error: function (status) {
                console.log(status);
                shophoa.notify('Cannot loading data', 'error');
            }
        });
    }
    function wrapPaging(recordCount, callBack, changePageSize) {
        var totalsize = Math.ceil(recordCount / shophoa.configs.pageSize);
        //Unbind pagination if it existed or click change pagesize
        if ($('#paginationUL a').length === 0 || changePageSize === true) {
            $('#paginationUL').empty();
            $('#paginationUL').removeData("twbs-pagination");
            $('#paginationUL').unbind("page");
        }
        //Bind Pagination Event
        $('#paginationUL').twbsPagination({
            totalPages: totalsize,
            visiblePages: 7,
            first: 'Đầu',
            prev: 'Trước',
            next: 'Tiếp',
            last: 'Cuối',
            onPageClick: function (event, p) {
                shophoa.configs.pageIndex = p;
                setTimeout(callBack(), 200);
            }
        });
    }
}
//var productController = function () {
//    this.initialize = function () {
//        loadData();
//    }

//    function registerEvents() {
//        //todo: binding events to controls
//    }

    //function loadData() {
    //    var template = $('#table-template').html();
    //    var render = "";
    //    $.ajax({
    //        type: 'GET',
    //        url: '/admin/product/GetAll',
    //        dataType: 'json',
    //        success: function (response) {
    //            $.each(response, function (i, item) {
    //                render += Mustache.render(template, {
    //                    Id: item.Id,
    //                    Name: item.Name,
    //                    Image: item.Image == null ? '<img src="/admin-side/images/user.png" width=25' : '<img src="' + item.Image + '" width=25 />',
    //                    CategoryName: item.ProductCategory.Name,
    //                    Price: shophoa.formatNumber(item.Price, 0),
    //                    CreatedDate: shophoa.dateTimeFormatJson(item.DateCreated),
    //                    Status: shophoa.getStatus(item.Status)
    //                });
    //                if (render != '') {
    //                    $('#tbl-content').html(render);
    //                }
    //            });
    //        },
    //        error: function (status) {
    //            console.log(status);
    //            tedu.notify('Cannot loading data', 'error');
    //        }
    //    })
    //}
//}