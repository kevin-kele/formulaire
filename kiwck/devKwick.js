const app = {
    kwick_api_url: 'http://greenvelvet.alwaysdata.net/kwick/api/',
    init: function() {



        $('#account').click(function() {
            $('#inscription').css({
                display: 'flex',

            });
            $('#connexion').css({
                display: 'none',

            })
        });
        $('#envoyer').click(function() {
            $('#inscription').css({
                display: 'none',
            });
            $('#connexion').css({
                display: 'flex',

            });



        });
        $('#account').on('click', app.ping);
        $('#envoyer').on('click', app.signup);
        $('#signup').on('click', app.login);
        $('#LogOut').on('click', app.logout);







    },
    ping: function() {
        $.ajax({
            url: app.kwick_api_url + 'ping',
            dataType: 'jsonp',
            type: 'GET',
            contentType: 'application/json; charset=utf-8',
            success: function(result, status, xhr) {
                console.log(result);
            },
            error: function(xhr, status, error) {
                alert('Error');
            }
        });
    },

    signup: function() {
        let user1 = $("#mail").val();
        let password = $('#pass').val();
        let password2 = $('#pass2').val();

        //    je teste l'enregistrement de l'utilisateur 
        if (password == password2) {
            $.ajax({
                url: 'http://greenvelvet.alwaysdata.net/kwick/api/signup/' + user1 + '/' + password,

                dataType: 'jsonp',
                type: 'POST',
                contentType: 'application/json; charset=utf-8',
                success: function(result, status, xhrlt) {
                    console.log(result);
                    localStorage.setItem('id', user1);
                    localStorage.setItem('password', password);
                },
                error: function(xhr, status, error) {
                    alert('Errorrrrr');

                }
            })
        }

    },

    login: function() {

        let login = $("#pseudo").val();
        let passwd = $('#pass_connexion').val();
        let getLog = localStorage.getItem('id');
        let getPass = localStorage.getItem('password');

        if ((login == getLog) && (passwd == getPass)) {

            $.ajax({
                url: 'http://greenvelvet.alwaysdata.net/kwick/api/login/' + getLog + '/' + getPass,

                dataType: 'jsonp',
                type: 'POST',
                contentType: 'application/json; charset=utf-8',
                success: function(result, status, xhrlt) {
                    console.log(result);
                    $('#connect_form').submit();
                },
                error: function(xhr, status, error) {
                    alert('Errorrrrr');

                }
            })
        }


    },
    logout: function() {
        // recupere les donner stoker dans ma variable
        let token = localStorage.getItem('id', token);
        console.log(token)


        $.ajax({
            url: 'http://greenvelvet.alwaysdata.net/kwick/logout/' + token + '/' + user1,

            dataType: 'jsonp',
            type: 'POST',
            contentType: 'application/json; charset=utf-8',
            success: function(result, status, xhrlt) {
                console.log(result);
                $('#userLogin').submit();
            },
            error: function(xhr, status, error) {
                alert('Errorrrrr');

            }
        })



    }

};