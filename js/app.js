$(document).ready(function () {         //da se izvrsi cel html pa posle se izvrsuvaat site drugi elementi u stranata

    let budget = 0;
    let balance = 0;
    let expenses = 0;
    let row = 0;

    $('#budget-form').on('submit', function (e) {
        e.preventDefault();

        let budgetInput = $('#budget-input').val();
        if (budgetInput < 1 || budgetInput == "" || budgetInput == undefined || budgetInput == null) {
            $('.budget-feedback').html("value cannot be empty or negative");
            $('.budget-feedback').show();
        } else {
            budget = budget + parseInt(budgetInput);
            balance = budget - expenses;
            $('#budget-amount').html(budget);
            $('#expense-amount').html(expenses);
            $('#balance-amount').html(balance);
            if(balance > 0 )
            $('#balance-amount').css('color','green');
            if(balance <0 ) 
            $('#balance-amount').css('color','red');
            if(balance == 0)
            $('#balance-amount').css('color','gray');

        }

        $('#budget-input').on('focus', function () {
            $('.budget-feedback').hide();
            $(this).val("");
        })
    })

        $('#expense-form').on('submit', function (e) {
            //Ja stopirame formata da napravi submit
            e.preventDefault();
            //ja zemame vrednosta od amount input i ja parsirame vo integer
            let amountInput = $('#amount-input').val();
            let amountTitle = $('#expense-input').val();
            //na globalnite expenses i balance presmetuvame novi vrednosti
            expenses = expenses + parseInt(amountInput);
            balance = budget - expenses;
            //gi osvezuvame spanovite so novite vrednosti
            $('#expense-amount').html(expenses);
            $('#balance-amount').html(balance);
            
            if(balance > 0 )
            $('#balance-amount').css('color','green');
            if(balance <0 ) 
            $('#balance-amount').css('color','red');
            if(balance == 0)
            $('#balance-amount').css('color','gray');

            if (row < 1) {
                $("#expenseTableDiv").html(
                    `<table style="width:100%" id="exTable">
                    <thead>
                        <th>Ex title</th>
                        <th>Ex amount</th>
                        <th>Action</th>
                    </thead>
                    <tbody>
                        <tr>
                            <td>${amountTitle}</td>
                            <td>${amountInput}</td>
                            <td>
                            <button class="editButton btn btn-primary">Edit</button>
                            </td>                        
                            <td>
                            <button class="deleteButton btn btn-danger">Delete</button>
                            </td>                        
                        </tr>
                    </tbody
                </table>`
                );
                row++;
            } else {
                $('#exTable tbody').append(`
                     <tr>
                        <td>${amountTitle}</td>
                        <td>${amountInput}</td>
                        <td>
                        <button class="editButton btn btn-primary">Edit</button>
                        </td>                        
                        <td>
                        <button class="deleteButton btn btn-danger">Delete</button>
                        </td>            
                    </tr>
            `);
            }

        })

        //stavanje na eventi ako se napraveni dinamicki 
        $(document).on('click', '.deleteButton', function(){
           /*
            vo promenlivata tempEx ja postavuvame vrednosta na trosokot koj go briseme 
            so $(this) go oznacuvame kliknatiot delete button, so parent go naogjame negoviot parent - vo ovoj slucaj <td></td>
           tagot, so siblings() vo array gi dobivame trite td koj se na isto nivo so td (pronajden so $(this).parent() )
            so $(this).parent().siblings().eq(1) ja odbirame vtorata kolona i so .text() ja zemame vrednosta
           */
            let tempEx = $(this).parent().siblings().eq(1).text();
           //pravime nova presmetka bez izbrisaniot trosok
           
           expenses = expenses - tempEx;
           balance = budget - expenses;

           // ja osvezuvame vrednosta vo spanovite
           $('#expense-amount').html(expenses);
           $('#balance-amount').html(balance);

           if(balance > 0 )
            $('#balance-amount').css('color','green');
            if(balance <0 ) 
            $('#balance-amount').css('color','red');
            if(balance == 0)
            $('#balance-amount').css('color','gray');
            
           //da ja izbriseme redicata od tabelata
           $(this).parent().parent().remove();
        })


        $(document).on('click', '.editButton', function(){
            let tempTittle = $(this).parent().siblings().eq(0).text();
            let tempEx = $(this).parent().siblings().eq(1).text();

            //ja popolnuvame expense formata - soodvetno dvata inputa
            $("#expense-input").val(tempTittle);
            $("#amont-input").val(parseInt(tempEx));
            //pravime nova presmetka bez izbrisaniot trosok
           expenses = expenses - tempEx;
           balance = budget - expenses;
            // ja osvezuvame vrednosta vo spanovite
           $('#expense-amount').html(expenses);
           $('#balance-amount').html(balance);

           //da ja izbriseme redicata od tabelata
           $(this).parent().parent().remove();




    })

})