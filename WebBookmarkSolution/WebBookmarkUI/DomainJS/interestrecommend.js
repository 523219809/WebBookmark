﻿$(function () {
    $("#btnSearch").bind("click", function (e)
    {
        e.preventDefault();
     
        var btnSearch = $("#btnSearch");
        btnSearch.attr("disabled", true);
        btnSearch.html("<i class='am-icon-spinner am-icon-spin'></i>正在努力寻找...");
        var nameOrEmail = $("#searchname").val();
        var divContent = $("#divContent");

        $("#bookmarkrecommend").parent().removeClass("am-active");
        $("#userrecommend").parent().removeClass("am-active");
        $("#searchuser").parent().addClass("am-active");

        $.ajax({
            type: "post",
            url: searchURL,
            data: { nameOrEmail: nameOrEmail },
            success:
                function (data) {
                    if (data != null) {
                        btnSearch.html(" <i class='am-icon-search'></i>搜索");
                        divContent.html(data);
                    }
                    btnSearch.html(" <i class='am-icon-search'></i>搜索");
                    btnSearch.attr("disabled", false);
                }
        });
        e.stopPropagation();


    })

    $('body').on("click", "[id='userrecommend']", function () {
        var $this = $(this);
        $("#bookmarkrecommend").parent().removeClass("am-active");
        $("#searchuser").parent().removeClass("am-active");
        $this.parent().addClass("am-active");
        ShowUserRecommend();
    })

    $('body').on("click", "[id='bookmarkrecommend']", function () {
        var $this = $(this);
        $("#userrecommend").parent().removeClass("am-active");
        $("#searchuser").parent().removeClass("am-active");
        $this.parent().addClass("am-active");
        ShowBookmarkRecommend();
    })

    $('body').on('click', "[id='searchuserfollowuser']", function (e) {
        e.preventDefault();
        var $this = $(this);
        var befollowUserID = $this.attr("data-id");;

        $.ajax({
            type: "post",
            url: followUserURL,
            data: { beFollowUserID: befollowUserID },
            success:
                function (result) {
                    if (result.IsSuccess) {
                        $this.removeClass("btn-success");
                        $this.addClass("am-btn-primary");
                        $this.html("<span>取消关注</span>");
                        $this.attr("id", "searchuserunFollowUser");
                    } else {
                        alert(result.ErrorMessage);
                    }

                }
        });
        e.stopPropagation();
    })

    $('body').on("click", "[id='searchuserunFollowUser']", function (e) {
        e.preventDefault();
        var $this = $(this);
        var befollowUserID = $this.attr("data-id");;

        $.ajax({
            type: "post",
            url: unFollowUserURL,
            data: { beFollowUserID: befollowUserID },
            success:
                function (result) {
                    if (result.IsSuccess) {
                        $this.removeClass("am-btn-primary");
                        $this.addClass("btn-success");
                        $this.attr("id", "followUser");
                        $this.html("<span>关注</span>");
                    } else {
                        alert(result.ErrorMessage);
                    }

                }
        });
        e.stopPropagation();
    })

    $('body').on('click', "[id='showUserDetail']", function (e) {
        e.preventDefault();
        var $this = $(this);
        var showUserInfoID = $this.attr("data-id");
        ShowUserDetail(showUserInfoID);
        e.stopPropagation();
    })

    ShowUserRecommend();
})


function ShowUserDetail(showUserInfoID) {
    $.ajax({
        type: "post",
        url: showUserInfoURL,
        data: { showUserInfoID: showUserInfoID },
        success:
            function (data) {
                $("#divContent").html(data);
                ShowFolder(showUserInfoID, 0);
            }
    });
}


function ShowUserRecommend()
{
    $("#userrecommendloading").addClass("am-icon-spinner").addClass("am-icon-spin");

    $.ajax({
        type: "post",
        url: showUserRecommendURL,
        success:
            function (data) {
                if (data != null) {
                    $("#overview").html(data);
                }
                $("#userrecommendloading").removeClass("am-icon-spinner").removeClass("am-icon-spin");
            }
    });
}


function ShowBookmarkRecommend() {
    $("#bookmarkrecommendloading").addClass("am-icon-spinner").addClass("am-icon-spin");

    $.ajax({
        type: "post",
        url: showBookmarkRecommendURL,
        success:
            function (data) {
                if (data != null) {
                    $("#overview").html(data);
                }
                $("#bookmarkrecommendloading").removeClass("am-icon-spinner").removeClass("am-icon-spin");
            }
    });
}



