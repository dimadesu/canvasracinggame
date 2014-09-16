requirejs.config({
    baseUrl: 'js/app',
    paths: {
        jquery: '../vendor/jquery',
        require: '../vendor/require'
    }
});

requirejs(['main']);
