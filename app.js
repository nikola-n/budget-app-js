$(document).ready(function () {

    let budget = 0;
    let balance = 0;
    let expenses = 0;
    let row = 0;

    $("#budget-form").on("submit", function (e) {
        e.preventDefault();
        let budgetInput = $("#budget-input").val();
        if (budgetInput < 1 || budgetInput == "" || budgetInput == undefined || budgetInput == null) {
            $(".budget-feedback").html("Value cannot be empty or negative");
            $(".budget-feedback").show();
        } else {
            budget = budget + parseInt(budgetInput);
            balance = budget - expenses;
            $("#budget-amount").html(budget);
            $("#expense-amount").html(expenses);
            $("#balance-amount").html(balance);
            if (balance > 0)
            $("#balance-amount,#balance span").css("color", "green");

        if (balance < 0)
            $("#balance-amount,#balance  span").css("color", "red");

        if (balance == 0)
            $("#balance-amount,#balance  span").css("color", "grey");
        }

    });

    $("#budget-input").on("focus", function () {
        $(".budget-feedback").hide();
        $(this).val("");
    })

    $("#expense-form").on("submit", function (e) {
        // Ja stopirame formata da napravi submit
        e.preventDefault();
        // ja zemame vrednosta od amount input i ja parsirame vo integer
        let amountInput = $("#amount-input").val();
        let amountTitle = $("#expense-input").val();
        // na globalnite expenses i balance presmetuvame novi vrednosti
        expenses = expenses + parseInt(amountInput);
        balance = budget - expenses;
        // Gi osvezuvame spanovite so novite vrednosti
        $("#expense-amount").html(expenses);
        $("#balance-amount").html(balance);
        if (balance > 0)
            $("#balance-amount,#balance span").css("color", "green");

        if (balance < 0)
            $("#balance-amount,#balance  span").css("color", "red");

        if (balance == 0)
            $("#balance-amount,#balance  span").css("color", "grey");


        if (row < 1) {
            $("#expenseTableDiv").html(
                `<table style="width:100%" id="exTable">
                    <thead>
                        <th> Ex title </th>
                        <th> Ex amount </th>
                        <th> Action </th>
                    </thead>
                    <tbody>
                        <tr>    
                            <td>${amountTitle}</td>
                            <td>${amountInput}</td>
                            <td>
                                <button class="editButton btn btn-primary">Edit</button>
                                <button class="deleteButton btn btn-danger">Delete</button>
                            </td>
                        </tr>
                    </tbody>
                </table>`
            );
            row++;
        } else {
            $("#exTable tbody").append(
                `<tr>    
                <td>${amountTitle}</td>
                <td>${amountInput}</td>
                <td>
                    <button class="editButton btn btn-primary">Edit</button>
                    <button class="deleteButton btn btn-danger">Delete</button>
                </td>
            </tr>`
            );
        }

    });

    $(document).on("click", ".deleteButton", function () {
        /*
          vo promenlivata tempEx ja postavuvame vrednosta na trosokot koj go brisime
          so $(this) go oznacuvame kliknatiot delete button, so parent go naogame negoviot parent - vo ovoj slucaj <td> tagot
          so siblings() vo array gi dobivame trite td koj se na isto nivo so td ( pronajden so $(this).parent() )
          so $(this).parent().siblings().eq(1) ja odbirame vtorata kolona i so .text() ja zemame vrednosta
        */
        let tempEx = $(this).parent().siblings().eq(1).text();
        // pravime nova presmetka bez izbrisaniot trosok
        expenses = expenses - tempEx;
        balance = budget - expenses;
        // ja osvezuvame vrednosta vo sapn-ovite
        $("#expense-amount").html(expenses);
        $("#balance-amount").html(balance);
        // da ja izbrisime redicata od tabelate
        $(this).parent().parent().remove();
        if (balance > 0)
        $("#balance-amount,#balance span").css("color", "green");

    if (balance < 0)
        $("#balance-amount,#balance  span").css("color", "red");

    if (balance == 0)
        $("#balance-amount,#balance  span").css("color", "grey");
    })

    $(document).on("click", ".editButton", function () {
        let tempTitle = $(this).parent().siblings().eq(0).text();
        let tempEx = $(this).parent().siblings().eq(1).text();

        // ja popolnuvame expense formata - soodvetno dvata inputa
        $("#expense-input").val(tempTitle);
        $("#amount-input").val(parseInt(tempEx));

        // pravime nova presmetka bez izbrisaniot trosok
        expenses = expenses - tempEx;
        balance = budget - expenses;

        // ja osvezuvame vrednosta vo sapn-ovite
        $("#expense-amount").html(expenses);
        $("#balance-amount").html(balance);

        $(this).parent().parent().remove();
        if (balance > 0)
            $("#balance-amount").css("color", "green");

        if (balance < 0)
            $("#balance-amount").css("color", "red");

        if (balance == 0)
            $("#balance-amount").css("color", "grey");
    });
});