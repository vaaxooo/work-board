module.exports = {

    index: function(request, response) {
        response.render('app/index', {
            title: "Главная страница"
        });
    }

}