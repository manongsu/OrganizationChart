$(function () {
    function tr($this) {
        var tr = "<tr>";
        $this.each(function () {
            var noLine = 0;console.log()
            if($(this).children("ul").children("li").html()==""){
                noLine = 1;
            }
            var noChild = 0;
            if($(this).html()==""){
                noChild = 1
            }
            var colspan = $(this).find("li:not(:has(ul))").length;
            var flag = 1;
            if($(this).index()==0){
                flag = "first";
            }else if($(this).index()==$(this).siblings().length){
                flag = "last";
            }
            tr = tr + "<td colspan='"+colspan+"'class='"+flag+"'noLine='"+noLine+"'><p class='"+$(this).attr("class")+"Top'></p><p class='"+$(this).attr("class")+"' child='"+$(this).children("ul").children("li").length+"'noChild='"+noChild+"'><span>"+$(this).children("p").html()+"</span></p><p class='"+$(this).attr("class")+"Bottom'></p><p class='line2'></p></td>";
        });
        tr = tr + "</tr>";
        return tr;
    }
    /*第三级*/
    var tr4 = tr($(".forth"));
    /*第三级*/
    var tr3 = tr($(".third"));
    /*第二级*/
    var tr2 = tr($(".second"));
    /*第一级*/
    var tr1 = tr($(".first"));
    var table = "<table cellspacing='0'>";
    table = table+tr1+tr2+tr3+tr4+"</table>";
    $(".org").append(table);
    function line() {
        var i = 0;
        $("td").each(function (){
            if($(this).parent("tr").next().text()!=""){
                if($(this).index()>0){
                    i++;
                }
                if($(this).index()==0){
                    i=0;
                }
                var width = parseInt($(this).css("width").replace("px",""));
                var firstwidth = parseInt($(this).parent("tr").next().children("td.first").eq(i).css("width"));
                var lastwidth = parseInt($(this).parent("tr").next().children("td.last").eq(i).css("width"));
                var lineWidth = width + 22 - (firstwidth+22) *0.5 - (lastwidth+22)*0.5;

                $(this).children(".line2").css({
                    "width":lineWidth,
                    "marginLeft":firstwidth *0.5
                });
                if($(this).parent("tr").next().children("td.first").eq(i).length<=0){
                    $(this).children(".line2").css("display","none");
                    $(this).children("p").eq(2).css("border","none");
                }
            }else{
                $(this).children(".line2").css("display","none");
                $(this).children("p").eq(2).css("display","none");
            }
        });
    }
    line();
    $("td").each(function (){
        if($(this).parent("tr").prev().text()!=""){

        }else{
            $(this).children("p").eq(0).css("display","none");
        }
    });
    $("p[noChild='1']").parent("td").css("opacity","0");
    $("td[noLine='1']").each(function () {
        $(this).children("p").eq(2).css("opacity","0");
        $(this).children("p").eq(3).css("opacity","0");
    })
});