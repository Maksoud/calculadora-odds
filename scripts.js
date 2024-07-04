;
(function($){
    $(document).ready(function($){

        //Máscara
        $('.valuemask').maskMoney({showSymbol: false, decimal: ",", thousands: ".", allowZero: true});

        var field_aposta,
            field_odd1,
            field_odd2,
            field_valorodd1,
            field_valorodd2,
            field_retorno,
            field_perctotal,
            field_resultodd1,
            field_resultodd2,
            aposta,
            odd1,
            odd2,
            valorodd1,
            valorodd2,
            retorno,
            perctotal,
            resultodd1,
            resultodd2;

        //Botão limpar campos
        $('[type="cancel"]').on('click', function(e) {

            e.preventDefault();

            field_aposta ? field_aposta.val('') : '';
            field_aposta ? field_odd1.val('') : '';
            field_odd2 ? field_odd2.val('') : '';
            field_valorodd1 ? field_valorodd1.val('') : '';
            field_valorodd2 ? field_valorodd2.val('') : '';
            field_retorno ? field_retorno.html('0,00') : '';
            field_perctotal ? field_perctotal.html('0,00') : '';
            field_resultodd1 ? field_resultodd1.html('0,00') : '';
            field_resultodd2 ? field_resultodd2.html('0,00') : '';
            aposta     = 0,
            odd1       = 0,
            odd2       = 0,
            valorodd1  = 0,
            valorodd2  = 0,
            retorno    = 0,
            perctotal  = 0,
            resultodd1 = 0,
            resultodd2 = 0;

        });

        function animateHtml(field, value) {
            $(field).stop().animate({backgroundColor: "#800",
                                     'color': "green",
                                     opacity: "0.3",
                                     transition: "all 0.8s"
                                    }, 300, 
                                    function () {
                                        if ($(field).is("input")) {
                                            //Atualiza o input
                                            $(field).val(value);
                                        } else {
                                            //Atualiza o HTML
                                            $(field).html(value);
                                        }//else if ($(field).is("input"))

                                        $(field).stop().animate({backgroundColor: "#800",
                                                                 'color': "green",
                                                                 opacity: "0.8",
                                                                 transition: "all 0.8s"
                                                                }, 400, 
                                                                function () {
                                                                    $(field).css("background-color", "");
                                                                    $(field).css("opacity", "");
                                                                    $(field).css("transition", "");
                                                                });
                                    });

            //Muda a cor do texto, quando negativo
            (parseFloat(value.replace('.', '').replace(',', '.')) < 0) ? $(field).css("color", "red") : $(field).css("color", "inherit");
        }

        $(document).on("click", "input", function(e) {
            this.select();
        });

        //Botão calcular
        //$('[type="submit"]').on('click', function(e) {
        $(document).on("focusout", "input", function(e) {

            e.preventDefault();
            
            field_aposta     = $('#aposta'),
            field_odd1       = $('#odd1'),
            field_odd2       = $('#odd2'),
            field_valorodd1  = $('#valorodd1'),
            field_valorodd2  = $('#valorodd2'),
            field_retorno    = $('#retorno'),
            field_perctotal  = $('#perctotal'),
            field_resultodd1 = $('#resultodd1'),
            field_resultodd2 = $('#resultodd2');
            
            /**********************************************************************/

            //Informou o valor da aposta e as ODDs?
            if (field_aposta.val() && field_odd1.val() && field_odd2.val()) {

                // console.log('primeiro');

                //Já tinha calculado o valor das ODDs antes?
                if (field_valorodd1.val() && field_valorodd2.val() && aposta !== undefined) {

                    // console.log('segundo');

                    if (parseFloat(field_aposta.val().replace(/[^0-9,]*/g, '').replace(',', '.')).toFixed(2) == aposta.toFixed(2)) {

                        // console.log('terceiro');

                        //Verificar se houve alteração nas ODDs
                        //Verificar se houve alteração em ambos os valores das ODDs

                        //O valor da ODD1 foi modificado?
                        if (parseFloat(field_valorodd1.val().replace(/[^0-9,]*/g, '').replace(',', '.')).toFixed(2) != parseFloat(valorodd1).toFixed(2)) { //replace(/,/g, '.')

                            // console.log('quarto');
                            
                            //Recalcula os valores
                            valorodd1 = parseFloat(field_valorodd1.val().replace(/[^0-9,]*/g, '').replace(',', '.')),
                            valorodd2 = parseFloat((valorodd1*odd1)/odd2),
                            aposta    = parseFloat(((valorodd1+valorodd2)/(odd1+odd2)*odd2)+((valorodd1*odd1)/odd2));

                            /******************************************************************/

                            //Cálculo dos percentuais de retorno
                            retorno    = parseFloat((odd1*(aposta/(odd1+odd2)*odd2))-aposta).toFixed(2),
                            perctotal  = parseFloat((odd1*(100/(odd1+odd2)*odd2))-100).toFixed(2),
                            resultodd1 = parseFloat((odd1*valorodd1)).toFixed(2),
                            resultodd2 = parseFloat((odd2*valorodd2)).toFixed(2);

                            /******************************************************************/

                            //Alimenta o valor da ODD2
                            field_valorodd2.val(valorodd2.toFixed(2).toString().replace(".", ","));

                            //Alimenta o percentual de retorno das ODDs
                            // field_retorno.html(retorno.toString().replace(".", ","));
                            // field_perctotal.html(perctotal.toString().replace(".", ","));
                            // field_resultodd1.html(resultodd1.toString().replace(".", ","));
                            // field_resultodd2.html(resultodd2.toString().replace(".", ","));
                            // field_aposta.val(aposta.toFixed(2).toString().replace(".", ","));

                            animateHtml(field_retorno, retorno.toString().replace(".", ","));
                            animateHtml(field_perctotal, perctotal.toString().replace(".", ","));
                            animateHtml(field_resultodd1, resultodd1.toString().replace(".", ","));
                            animateHtml(field_resultodd2, resultodd2.toString().replace(".", ","));
                            animateHtml(field_aposta, aposta.toFixed(2).toString().replace(".", ","));

                            return;

                        }//if (parseFloat(field_valorodd1.val().replace(/[^0-9,]*/g, '').replace(',', '.')) != valorodd1)

                        /**************************************************************/

                        if (parseFloat(field_valorodd2.val().replace(/[^0-9,]*/g, '').replace(',', '.')).toFixed(2) != parseFloat(valorodd2).toFixed(2)) {

                            // console.log('quinta');
                            
                            //Recalcula os valores
                            valorodd2 = parseFloat(field_valorodd2.val().replace(/[^0-9,]*/g, '').replace(',', '.')),
                            valorodd1 = (valorodd2*odd2)/odd1,
                            aposta    = parseFloat(((valorodd1+valorodd2)/(odd1+odd2)*odd2)+((valorodd1*odd1)/odd2));

                            /******************************************************************/

                            //Cálculo dos percentuais de retorno
                            retorno    = parseFloat((odd1*(aposta/(odd1+odd2)*odd2))-aposta).toFixed(2),
                            perctotal  = parseFloat((odd1*(100/(odd1+odd2)*odd2))-100).toFixed(2),
                            resultodd1 = parseFloat((odd1*valorodd1)).toFixed(2),
                            resultodd2 = parseFloat((odd2*valorodd2)).toFixed(2);

                            /******************************************************************/

                            //Alimenta o valor da ODD1
                            field_valorodd1.val(valorodd1.toFixed(2).toString().replace(".", ","));

                            //Alimenta o percentual de perctotal das ODDs
                            // field_retorno.html(retorno.toString().replace(".", ","));
                            // field_perctotal.html(perctotal.toString().replace(".", ","));
                            // field_resultodd1.html(resultodd1.toString().replace(".", ","));
                            // field_resultodd2.html(resultodd2.toString().replace(".", ","));
                            // field_aposta.val(aposta.toFixed(2).toString().replace(".", ","));

                            animateHtml(field_retorno, retorno.toString().replace(".", ","));
                            animateHtml(field_perctotal, perctotal.toString().replace(".", ","));
                            animateHtml(field_resultodd1, resultodd1.toString().replace(".", ","));
                            animateHtml(field_resultodd2, resultodd2.toString().replace(".", ","));
                            animateHtml(field_aposta, aposta.toFixed(2).toString().replace(".", ","));

                            return;

                        }//if (parseFloat(field_valorodd2.val().replace(/[^0-9,]*/g, '').replace(',', '.')) != valorodd2)

                    }//if (parseFloat(field_aposta.val().replace(/[^0-9,]*/g, '').replace(',', '.')).toFixed(2) == aposta.toFixed(2))

                }//if (field_valorodd1.val() && field_valorodd2.val() && aposta !== undefined)

                /******************************************************************/

                //Recebe o valor da aposta e das ODDs
                aposta = parseFloat(field_aposta.val().replace(/[^0-9,]*/g, '').replace(',', '.')),
                odd1   = parseFloat(field_odd1.val().replace(/[^0-9,]*/g, '').replace(',', '.')),
                odd2   = parseFloat(field_odd2.val().replace(/[^0-9,]*/g, '').replace(',', '.'));

                /******************************************************************/

                //Cálculo dos valores das ODDs
                valorodd1 = parseFloat(aposta/(odd1+odd2)*odd2).toFixed(2),
                valorodd2 = parseFloat((valorodd1*odd1)/odd2).toFixed(2);

                /******************************************************************/

                //Alimenta o valor das ODDs
                field_valorodd1.val(valorodd1.toString().replace(".", ","));
                field_valorodd2.val(valorodd2.toString().replace(".", ","));

                /******************************************************************/

                //Cálculo dos percentuais de retorno
                retorno    = parseFloat((odd1*(aposta/(odd1+odd2)*odd2))-aposta).toFixed(2),
                perctotal  = parseFloat((odd1*(100/(odd1+odd2)*odd2))-100).toFixed(2),
                resultodd1 = parseFloat((odd1*valorodd1)).toFixed(2),
                resultodd2 = parseFloat((odd2*valorodd2)).toFixed(2);

                /******************************************************************/

                //Alimenta o percentual de perctotal das ODDs
                // field_retorno.html(retorno.toString().replace(".", ","));
                // field_perctotal.html(perctotal.toString().replace(".", ","));
                // field_resultodd1.html(resultodd1.toString().replace(".", ","));
                // field_resultodd2.html(resultodd2.toString().replace(".", ","));

                animateHtml(field_retorno, retorno.toString().replace(".", ","));
                animateHtml(field_perctotal, perctotal.toString().replace(".", ","));
                animateHtml(field_resultodd1, resultodd1.toString().replace(".", ","));
                animateHtml(field_resultodd2, resultodd2.toString().replace(".", ","));
                
            }//if (field_aposta.val() && field_odd1.val() && field_odd2.val())

        });

    });
})(jQuery);