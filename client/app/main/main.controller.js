'use strict';

var navSections = [
    { title: 'Home',        state: 'main.home',         url: '/',               templateUrl: 'app/views/home.html'},
    { title: 'Biography',   state: 'main.biography',    url: '/biography' },    // If no templateUrl, this will be views{{url}}.html
    { title: 'Education',   state: 'main.education',    url: '/education' },
    { title: 'Ensembles',   state: 'main.ensembles',    url: '/ensembles' },
    { title: 'Contact',     state: 'main.contact',      url: '/contact' },
    { title: 'Gallery',     state: 'main.gallery',      url: '/gallery',        controller: 'GalleryCtrl' },
    { title: 'Links',       state: 'main.links',        url: '/links' }
];

var carouselImages = [
    'assets/images/carousel/gallery4_crsl.JPG',
    'assets/images/carousel/gallery6_crsl.JPG',
    'assets/images/carousel/gallery7_crsl.JPG',
    'assets/images/carousel/gallery8_crsl.JPG',
    'assets/images/carousel/gallery9_crsl.JPG',
    'assets/images/carousel/gallery10_crsl.JPG',
    'assets/images/carousel/gallery11_crsl.JPG',
    'assets/images/carousel/gallery12_crsl.JPG'
];

var galleryImages = [
    {image:'assets/images/gallery/gallery6.JPG', description: 'Tracy James - saxophone'},
    {image:'assets/images/gallery/gallery7.JPG', description: 'Tracy James - flute'},
    {image:'assets/images/gallery/gallery8.JPG', description: 'Tracy James - saxophone'},
    {image:'assets/images/gallery/gallery9.JPG', description: 'Tracy James - saxophone'},
    {image:'assets/images/gallery/gallery2_portrait.JPG', description: 'Tracy James - saxophone'},
    {image:'assets/images/gallery/gallery14_head.JPG', description: 'Tracy James - flute'},
    {image:'assets/images/gallery/gallery3_portrait.JPG', description: 'Tracy James - clarinet'},
    {image:'assets/images/gallery/gallery13_head.JPG', description: 'Tracy James - flute'},
    {image:'assets/images/gallery/gallery5_portrait.JPG', description: 'Tracy James - saxophone'},
    {image:'assets/images/gallery/gallery10.JPG', description: 'Tracy James - flute'},
    {image:'assets/images/gallery/gallery12.JPG', description: 'Tracy James - saxophone'},
    {image:'assets/images/gallery/gallery4.JPG', description:  'Tracy James - flute, clarinet and saxophone'},
    {image:'assets/images/gallery/gallery11.JPG', description: 'Tracy James - flute'}
]

var tracks = [
    {
        instrument: "Flute",
        composer: "William Matthias",
        title: "Sonantina for Flute and Piano - 1st Mvt",
        src: "assets/tracks/TracyJames-Mathias.mp3"
    },
    {
        instrument: "Clarinet",
        composer: "Charles Stanford",
        title: "3 Intermezzi - 3rd Mvt",
        src: "assets/tracks/TracyJames-Stanford.mp3"
    },
    {
        instrument: "Saxophone",
        composer: "Pedro Iturralde",
        title: "Pequena Czarda",
        src: "assets/tracks/TracyJames-Iturralde.mp3"
    },
    {
        instrument: "Flute",
        composer: "Gabriel Fauré",
        title: "Morceau de Concours",
        src: "assets/tracks/TracyJames-Faure.mp3"
    },
    {
        instrument: "Clarinet",
        composer: "Thomas Dunhill",
        title: "Phantasy Suite - 1st Mvt",
        src: "assets/tracks/TracyJames-Dunhill.mp3"
    },
    {
        instrument: "Bass Clarinet",
        composer: "Bernard Heyes",
        title: "Humoresque",
        src: "assets/tracks/TracyJames-Heyes.mp3"
    }
];

angular.module('tjWithNodeApp')
    .controller('MainCtrl', function ($scope, $rootScope, $http, $interval, $location) {

    /* NAVIGATION */
    $scope.navSections = navSections;
    $rootScope.$on("$locationChangeStart", function(event, next, current) {
        $scope.path = next;
    });
    $scope.isActive = function (viewLocation) {
        return viewLocation === $location.path();
    };


    /* IMAGES */
    $scope.carouselImages = carouselImages;
    $scope.currentImageIndex = 0;
    $interval(function() {
        if ($scope.currentImageIndex >= $scope.carouselImages.length-1) {
            $scope.currentImageIndex = 0;
        } else {
            $scope.currentImageIndex += 1;
        }
    }, 10000);

    /* AUDIO */

    $scope.playing = false;
    $scope.tracks = tracks;
    var currentTrackIndex = 0;
    $scope.currentTrack = tracks[0];

    $scope.togglePlaying = function() {
        $scope.playing = !$scope.playing;
        if ($scope.playing) {
            $scope.audio.play();
        } else {
            $scope.audio.pause();
        }
    };

    $scope.previousTrack = function() {
        if (!$scope.playing) {
            return;
        }

        var newIndex = currentTrackIndex - 1;
        if (newIndex < 0) {
            newIndex = 0;
        }
        currentTrackIndex = newIndex;
        refreshTrack();
    };

    $scope.nextTrack = function() {
        if (!$scope.playing) {
            return;
        }

        var newIndex = currentTrackIndex + 1;
        if (newIndex > $scope.tracks.length-1) {
            newIndex = $scope.tracks.length-1;
        }
        currentTrackIndex = newIndex;
        refreshTrack();
    };

    function refreshTrack() {
        console.log(currentTrackIndex);
        $scope.currentTrack = $scope.tracks[currentTrackIndex];
        $scope.audio.play(currentTrackIndex);
    }

    setTimeout(function() {
        $scope.audio.on('ended', function (evt) {
            console.log('audio ended');
        });
    }, 500);

    })

    .controller('GalleryCtrl', function($scope, $rootScope, $interval, $location) {
        $scope.galleryImages = galleryImages;

        $(document).ready(function() {
            $('.gallery-thumbnail').fancybox();
        });

        /*
         $scope.direction = 'left';
         $scope.currentIndex = 0;

         $scope.setCurrentSlideIndex = function (index) {
         $scope.direction = (index > $scope.currentIndex) ? 'left' : 'right';
         $scope.currentIndex = index;
         };

         $scope.isCurrentSlideIndex = function (index) {
         return $scope.currentIndex === index;
         };

         $scope.prevSlide = function () {
         $scope.direction = 'left';
         $scope.currentIndex = ($scope.currentIndex < $scope.slides.length - 1) ? ++$scope.currentIndex : 0;
         };

         $scope.nextSlide = function () {
         $scope.direction = 'right';
         $scope.currentIndex = ($scope.currentIndex > 0) ? --$scope.currentIndex : $scope.slides.length - 1;
         };
         */
    });