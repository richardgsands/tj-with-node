'use strict';

var navSections = [
    { title: 'Home',        state: 'main.home',         url: '/',               templateUrl: 'app/views/home.html'},
    { title: 'Biography',   state: 'main.biography',    url: '/biography' },    // If no templateUrl, this will be views{{url}}.html
    { title: 'Education',   state: 'main.education',    url: '/education' },
    { title: 'Ensembles',   state: 'main.ensembles',    url: '/ensembles' },
    { title: 'Contact',     state: 'main.contact',      url: '/contact',        controller: 'ContactCtrl'},
    { title: 'Gallery',     state: 'main.gallery',      url: '/gallery',        controller: 'GalleryCtrl' },
    { title: 'Music',       state: 'main.music',        url: '/music',          smallScreenOnly: false },
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

var galleryImagesLocationHires = 'assets/images/gallery/hires/';
var galleryImagesLocationLores = 'assets/images/gallery/lores/';
var galleryImages = [
    {image:'gallery6.JPG', description: 'Tracy James - saxophone'},
    {image:'gallery7.JPG', description: 'Tracy James - flute'},
    {image:'gallery8.JPG', description: 'Tracy James - saxophone'},
    {image:'gallery9.JPG', description: 'Tracy James - saxophone'},
    {image:'gallery2_portrait.JPG', description: 'Tracy James - saxophone'},
    {image:'gallery14_head.JPG', description: 'Tracy James - flute'},
    {image:'gallery3_portrait.JPG', description: 'Tracy James - clarinet'},
    {image:'gallery13_head.JPG', description: 'Tracy James - flute'},
    {image:'gallery5_portrait.JPG', description: 'Tracy James - saxophone'},
    {image:'gallery10.JPG', description: 'Tracy James - flute'},
    {image:'gallery12.JPG', description: 'Tracy James - saxophone'},
    {image:'gallery4.JPG', description:  'Tracy James - flute, clarinet and saxophone'},
    {image:'gallery11.JPG', description: 'Tracy James - flute'}
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
    },
    {
        instrument: "Flute",
        composer: "Arnold Cooke",
        title: "Sonatina for flute and piano - 1st Mvt",
        src: "assets/tracks/TracyJames-Cooke.mp3"
    }
];

var links = [
    {
        "title": "Trillium",
        "description": "Two flutes and piano",
        "link": "http://www.facebook.com/pages/Trillium/203895322979643?sk=info"
    },
    {
        "title": "Stephen Butler",
        "description": "Instrument repairs",
        "link": "http://www.stephenbutler-repairs.co.uk/"
    },
    {
        "title": "Andy Eastwood",
        "description": "Ukulele",
        "link": "http://www.andyeastwood.com/"
    },
    {
        "title": "Jill Kemp",
        "description": "Recorder",
        "link": "http://www.jillkemp.com/"
    },
    {
        "title": "Bernard Heyes",
        "description": "Composer",
        "link": "http://www.bernardheyes.org.uk/"
    },
    {
        "title": "Joanna Wyld",
        "description": "Writer (Notes upon Notes)",
        "link": "http://www.notes-upon-notes.com/"
    },
    {
        "title": "BYMT",
        "description": "Bromley Youth Music Trust",
        "link": "http://www.bymt.co.uk/"
    },
    {
        "title": "St George's, Bloomsbury",
        "description": "Parish church and concert venue",
        "link": "http://www.stgeorgesbloomsbury.org.uk/"
    },
    {
        "title": "Bromley Parish Church",
        "description": "Parish Church and Concert Venue",
        "link": "http://www.bromleyparishchurch.org/concerts-and-recitals"
    },
    {
        "title": "Just Flutes",
        "description": "Europe's largest supplier of flutes and flute music",
        "link": "www.justflutes.com"
    },
    {
        "title": "Gwalia Male Choir",
        "description": "Welsh Male Voice Choir",
        "link": "http://www.gwaliamalevoicechoir.org.uk/"
    },
    {
        "title": "BBIS",
        "description": "Instrument Insurance",
        "link": "http://www.brassbandinsuranceservices.co.uk/"
    },
    {
        "title": "East Dulwich Academy",
        "description": "Academy of Music and Performing Arts",
        "link": "http://www.eastdulwichacademy.org/"
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
            return ('/main' + viewLocation) === $location.path();
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

        /* LINKS */
        $scope.links = links;

        /* EVENTS */
        // Get static JSON
        $http.get('assets/cms/upcomingEvents.json', $scope.message, {timeout: 5000})
            .success(function(response) {
                console.log(response);
                var allEvents = response;
                allEvents = allEvents || [];

                $scope.upcomingEvents = _.filter(allEvents, function(event) {
                    
                    // Exclude if end date is before today
                    if ( moment(event.endDate).isBefore(moment(), 'day') ) {
                        return false

                    } else {
                        // Set timeFromNow
                        if ( moment(event.endDate).isSame(moment(), 'day') ) {
                            event.timeFromNow = "Last show today"

                        } else if ( moment(event.startDate).isSame(moment(), 'day') ) {
                            event.timeFromNow = "Starts today"

                        } else if ( moment(event.startDate).isBefore(moment(), 'day') ) {
                            event.timeFromNow = "Ends " + getDaysFromNowDisplay( event.endDate );

                        } else {
                            event.timeFromNow = "Starts " + getDaysFromNowDisplay( event.startDate );
                        }


                        return true;
                    };

                    function getDaysFromNowDisplay(date) {
                        // Before now
                        if ( moment(date).isBefore(moment(), 'day') ) {
                            return moment(date).fromNow();
                        // Today
                        } else if ( moment(date).isSame(moment(), 'day') ) {
                            return "today";
                        // Tomorrow
                        } else if ( moment(date).isSame( moment().add(1, 'days'), 'day' ) ) {
                            return "tomorrow";
                        } else {
                            return moment(date).add(1, 'days').fromNow();   // Need to add one day, otherwise moment sees a date two days from now as 1 day from now
                        }
                    }

                });
            })
            .error(function(response) {
                console.log("Error", response);
                $scope.upcomingEvents = {};
            });

        /* AUDIO */

        $scope.playing = false;
        $scope.tracks = tracks;
        $scope.currentTrackIndex = 0;
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

            var newIndex = $scope.currentTrackIndex - 1;
            if (newIndex < 0) {
                newIndex = 0;
            }
            $scope.currentTrackIndex = newIndex;
            refreshTrack();
        };

        $scope.nextTrack = function() {
            if (!$scope.playing) {
                return;
            }

            var newIndex = $scope.currentTrackIndex + 1;
            if (newIndex > $scope.tracks.length-1) {
                newIndex = $scope.tracks.length-1;
            }
            $scope.currentTrackIndex = newIndex;
            refreshTrack();
        };

        $scope.playTrack = function($index) {
            $scope.playing = true;
            $scope.currentTrackIndex = $index;
            refreshTrack();
        };

        function refreshTrack() {
            $scope.currentTrack = $scope.tracks[$scope.currentTrackIndex];
            $scope.audio.play($scope.currentTrackIndex);
        }

        // Bind audio events (using timeout to ensure audio control is initialised)
        setTimeout(function() {

            $scope.audio.on('loadeddata', function (evt) {
                // Zero based array        // One based array
                $scope.currentTrackIndex = $scope.audio.currentTrack - 1;
                $scope.currentTrack = $scope.tracks[$scope.currentTrackIndex];
            });

        }, 1000);


    })

    .controller('GalleryCtrl', function($scope, $rootScope, $interval, $location) {
        $scope.galleryImagesLocationHires = galleryImagesLocationHires;
        $scope.galleryImagesLocationLores = galleryImagesLocationLores;
        $scope.galleryImages = galleryImages;

        // This block prevents router from redirecting to route when image is 'opened'
        $scope.$on('$locationChangeStart',
            function (event, next, current) {
                if (next.indexOf('/images/') > 0) {
                    event.preventDefault();
                }
            });

        $(document).ready(function() {
            $(".gallery-thumbnail").fancybox({
                //prevEffect	: 'none',
                //nextEffect	: 'none',
                helpers	: {
                    title	: {
                        type: 'outside'
                    },
                    thumbs	: {
                        width	: 50,
                        height	: 50
                    }
                }
            });
        });

    })

    .controller('ContactCtrl', function($scope, $rootScope, $interval, $location, $http) {

        $scope.message = {};
        $scope.success = false;
        $scope.error = false;
        $scope.sending = false;

        $scope.submit = function() {
            $scope.success = false;
            $scope.error = false;
            $scope.sending = true;

            $http.post('/api/messages/sendMessage', $scope.message, {timeout: 5000})
                .success(function() {
                   $scope.success = true;
                   $scope.message = {};
                   $scope.sending = false;
                })
                .error(function(response) {
                    console.log("Error", response);
                    $scope.error = response;
                    $scope.sending = false;
                })

        }

    });