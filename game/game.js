﻿/// <reference path="../game/ref.js" />

/* GAME CONTROLLER */

/* GLOBAL VARS */
var canvas, engine, animRatio;

var score = 10;

/* MAIN GAME */
window.addEventListener("DOMContentLoaded", function () {

    if (BABYLON.Engine.isSupported()) {
        var fpsDiv = document.getElementById("fps");

        canvas = document.getElementById("renderCanvas");
        engine = new BABYLON.Engine(canvas, true);
        engine.enableOfflineSupport = true;

        // First, create the scene
        createScene();

        // create the music analyser
        analyseMusic();

        // Player Controller
        controlPlayer();

        // GAME LOOP
        engine.runRenderLoop(function () {
            // animation ratio
            animRatio = scene.getAnimationRatio();

            // move the camera forward
            if(!player.isDead){
                cam.speed = Lerp(cam.speed, 1.5, animRatio / 2000.0);
                score += 10;
            }

            cam.position.z += cam.speed;

            // render the scene
            scene.render();

            fpsDiv.innerText = engine.getFps().toFixed(0);

            $('#score').html(score);
        });

        // the canvas/window resize event handler
        window.addEventListener('resize', function () {
            engine.resize();
        });

        // FOR DEVELOPMENT ONLY
        //debugLayer = new BABYLON.DebugLayer(scene);
        //debugLayer.show();
    }else{
        // WebGL is not supported
        $('html').css('background-color', '#ef9a9a');
        $('body').html("<div id='webglNoSupport'>" +
            "WebGL is not supported on this browser<br/><span id='helper'>" +
            "Please use a browser that supports WebGL and also make sure you have your latest graphics card driver installed" +
            "<br/>For more info click <a href='http://webglreport.com/' target='_blank'>here</a></span></div>");
    }
});

/* SYSTEM FUNCTIONS */

function toggleFullScreen() {
    if (!document.fullscreenElement &&    // alternative standard method
        !document.mozFullScreenElement && !document.webkitFullscreenElement && !document.msFullscreenElement) {  // current working methods
        if (document.documentElement.requestFullscreen) {
            document.documentElement.requestFullscreen();
        } else if (document.documentElement.msRequestFullscreen) {
            document.documentElement.msRequestFullscreen();
        } else if (document.documentElement.mozRequestFullScreen) {
            document.documentElement.mozRequestFullScreen();
        } else if (document.documentElement.webkitRequestFullscreen) {
            document.documentElement.webkitRequestFullscreen(Element.ALLOW_KEYBOARD_INPUT);
        }
    }
}

function Lerp(start, end, amount) {
    return (start + (end - start) * amount);
}

function startPlaying(){

    $('#title').animate({
        opacity: 0
    }, 500, function(){
        $('#title').css('visibility', 'hidden');
    });

    $('#credit').animate({
        opacity: 0
    }, 500, function(){
        $('#credit').css('visibility', 'hidden');
    });

    $('#webglLogo').animate({
        opacity: 0
    }, 500, function(){
        $('#webglLogo').css('visibility', 'hidden');
    });

    $('.menu').animate({
        opacity: 0
    }, 500, function(){
        $('#score').css({
            'opacity': '0.7',
            'visibility': 'visible'
        });
        $('.menu').css({
            'visibility' : 'hidden'
        });
        player.isDead = false;
        player.isVisible = true;
        music.play();
        score = 10;
        cam.speed = 0.1;
        clearAllInScene();
        initHazardPozs();

        player.X = 1;
        player.Z = 1;
    });
}

function clearAllInScene(){
    for(var i = 0; i < colliders.length; i++){
        scene.removeMesh(colliders[i]);
    }

    colliders = [];
}

function Retry() {
    $('#leaderboardMenu').animate({
        opacity: 0
    }, 500, function(){
        $('#score').css({
            'opacity': '0.7',
            'visibility': 'visible'
        });
        $('#leaderboardMenu').css('visibility', 'hidden');

        clearAllInScene();
        initHazardPozs();

        score = 10;
        cam.speed = 0.1;
        player.isDead = false;
        player.isVisible = true;
        player.X = 1;
        player.Z = 1;
        music.stop();
        music.play();
    });
}

function Menu(){
    $('#leaderboardMenu').animate({
        opacity: 0
    }, 500, function(){
        $('#score').css('visibility', 'hidden');
        $('#leaderboardMenu').css('visibility', 'hidden');
        $('#mainMenu').css('visibility', 'visible')
            .animate({
                'opacity': '0.7'
            }, 500);
        cam.speed = 0.1;
    });

    $('#title').animate({
        opacity: 1
    }, 500, function(){
        $('#title').css('visibility', 'visible');
    });

    $('#credit').animate({
        opacity: 1
    }, 500, function(){
        $('#credit').css('visibility', 'visible');
    });

    $('#webglLogo').animate({
        opacity: 1
    }, 500, function(){
        $('#webglLogo').css('visibility', 'visible');
    });
}

function LeaderBoards(){

}

function connectSoundcloud(){

}

function connectGoogle(){

}