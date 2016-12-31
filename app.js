var app = angular.module("ratingModule", []);

app.component("rating", {

    bindings: {
        minRating: "=?",
        maxRating: "=?",
        currentRating: "=",
        onRatingChanged: "&",
        readOnly: "=?"
    },

    template: "<span ng-repeat = 's in $ctrl.selectedStars track by $index' ng-mouseenter='$ctrl.applyStar($index,true)'"+
        "ng-mouseleave='$ctrl.applyStar($index,false)' ng-click='$ctrl.setRating($index+1)'>" +
        "<span ng-if='s == 0'>{{$ctrl.ratingDeSelectedChar}}</span>" +
        "<span ng-if='s == 1'>{{$ctrl.ratingSelectedChar}}</span></span>",

    controller: function ratingController() {

        this.$onInit = function () {

            this.minRating = this.minRating === undefined ? 1 : this.minRating;
            this.maxRating = this.maxRating === undefined ? 5 : this.maxRating;
            this.originalRating = this.currentRating;
            this.ratingDeSelectedChar = "\u2606";
            this.ratingSelectedChar = "\u2605";
            this.selectedStars = new Array(this.maxRating-1);

            this.createStars();
        }

        this.applyStar = function (index, apply) {
            if (this.readOnly) return;

            this.currentRating = apply ? index + 1 : this.originalRating;
            this.createStars();
        }

        this.setRating = function (ratingNumber) {
            if (this.readOnly) return;

            var r = ratingNumber;
            if (r < this.minRating) r = this.minRating;
            if (r > this.maxRating) r = this.maxRating;
           
            this.currentRating = r;
            this.originalRating = r;

            this.createStars();
            this.onRatingChanged();
        }

        this.createStars = function () {

            for (i = 0; i < this.maxRating; i++) {
                if (i <= this.currentRating-1)
                    this.selectedStars[i] = 1;
                else
                    this.selectedStars[i] = 0;
            }
        }
    }
});

app.component("myrating", {

    template: '<rating current-rating="$ctrl.currentRating" read-only="false" on-rating-changed="$ctrl.ratingChanged()" >',
    controller: function () {
        this.currentRating = 1;
        this.ratingChanged = function () {
            alert(this.currentRating);
        }
    }
    
});
