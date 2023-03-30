$(function() {

    $('.delete-category').on('click', function(e) {   
        e.preventDefault();
        const link = $(this).attr('href');
        deleteSmh(link);
    });

    $('.delete-publisher').on('click', function(e) {   
        e.preventDefault();
        const link = $(this).attr('href');
        deleteSmh(link);
    });

    $('.delete-author').on('click', function(e) {   
        e.preventDefault();
        const link = $(this).attr('href');
        deleteSmh(link);
    });

    $('.delete-book').on('click', function(e) {   
        e.preventDefault();
        const link = $(this).attr('href');
        deleteSmh(link);
    });

    function deleteSmh(link) {

        Swal.fire({
            title: 'Are you sure?',
            text: 'You won\'t be able to revert this!',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
        }).then((result) => {
            if (result.isConfirmed) {
                
                $.get(link, function(result) {
                    
                    Swal.fire({
                        position: 'top-end',
                        icon: 'success',
                        title: 'Borrado exitoso!',
                        showConfirmButton: false,
                        timer: 1000
                    });

                    setTimeout(() => location.reload(), 1000); 
                   
                }).fail((xhr, status, error) => console.error('Hubo un error al borrar: ', error));
            }
        });
    }
});
 