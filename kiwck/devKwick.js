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
        $('.chat_ib').replaceWith(app.logged);

        // $('.sent_msg').on('click', app.talk);



        // $('.chat_list').replace(localStorage.getItem('token'), result.result.user);








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
                    localStorage.setItem('token', result.result.token);
                    localStorage.setItem('id2', result.result.id);
                    localStorage.setItem('mess', result.result.message);
                    localStorage.setItem('talk', result.result.timestamp);
                },
                error: function(xhr, status, error) {
                    alert('Errorrrrr');

                }
            })
        }


    },
    logout: function() {
        // recupere les donner stoker dans ma variable

        let token = localStorage.getItem('token');
        let id2 = localStorage.getItem('id2');

        console.log(token)
        console.log(id2)



        $.ajax({
            url: 'http://greenvelvet.alwaysdata.net/kwick/api/logout/' + token + '/' + id2,

            dataType: 'jsonp',
            type: 'POST',
            contentType: 'application/json; charset=utf-8',
            success: function(result, status, xhrlt) {
                console.log(result);
                window.location.href = 'index.html'
                alert('bey bey ;)')
            },
            error: function(xhr, status, error) {
                alert('Errorrrrr');

            }
        })



    },
    logged: function() {
        let token = localStorage.getItem('token');
        let id2 = localStorage.getItem('id2');
        let utilisateur = localStorage.getItem('user');
        console.log(utilisateur)


        $.ajax({
            url: 'http://greenvelvet.alwaysdata.net/kwick/api/user/logged/' + token,

            dataType: 'jsonp',
            type: 'POST',
            contentType: 'application/json; charset=utf-8',
            success: function(result, status, xhrlt) {
                console.log(result);
                // localStorage.setItem('mesgs', result.result.message)


            },
            error: function(xhr, status, error) {
                alert('Errorrrrr');

            }
        })



    },
    say: function() {
        let token = localStorage.getItem('token');
        let id2 = localStorage.getItem('id2');
        // let message = localStorage.getItem('mesgs');
        let writ = $(".write_msg").val();
        console.log(writ)
        console.log(token)
        console.log(id2)


        $.ajax({
            url: 'http://greenvelvet.alwaysdata.net/kwick/api/say/' + token + '/' + id2 + '/' + writ,

            dataType: 'jsonp',
            type: 'POST',
            contentType: 'application/json; charset=utf-8',
            success: function(result, status, xhrlt) {
                for (let k = 0; k < result.result.user.length; k++) {
                    $('.text-center').after('<div class=\"inbox_chat\">\
                    <div class="chat_list.active_chat"></div><div class=\"chat_img\"' + result.result.user[k] + '</div>');

                }
                console.log(result);


            },
            error: function(xhr, status, error) {
                alert('Errorrrrr');

            }
        })




    },
    talk: function() {
        let token = localStorage.getItem('token');
        let id2 = localStorage.getItem('id2');
        let timestamp = 0;



        $.ajax({
            url: 'http://greenvelvet.alwaysdata.net/kwick/api/talk/list/' + token + '/' + timestamp,

            dataType: 'jsonp',
            type: 'POST',
            contentType: 'application/json; charset=utf-8',
            success: function(result, status, xhrlt) {
                console.log(result);


            },
            error: function(xhr, status, error) {
                alert('Errorrrrr');

            }
        })



    },



};