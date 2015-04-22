describe("ClickElsewhere Test Suite", function() {
    "use strict";
    var fixture;

    beforeEach(function() {
        fixture = setFixtures(
        '<div>' +
            '<div id="click">Click Me</div>' +
            '<div id="other-element">Other Element</div>' +
        '</div>');

    });

    describe("onClickElsewhere", function() {
        it("invokes callback when other element clicked", function() {
            var callbackRun = false;
            var callback = function() {
                callbackRun = true;
            };
            ClickElsewhere.onClickElsewhere(fixture.find("#click"), callback);
            fixture.find("#other-element").click();
            expect(callbackRun).toBe(true);
        });

        it("only attaches once", function() {
            var callbackCounter = 0;
            var callback = function() {
                callbackCounter++;
            };
            ClickElsewhere.onClickElsewhere(fixture.find("#click"), callback);
            ClickElsewhere.onClickElsewhere(fixture.find("#click"), callback);
            ClickElsewhere.onClickElsewhere(fixture.find("#click"), callback);
            fixture.find("#other-element").click();
            expect(callbackCounter).toBe(1);
        });

        it("works with dom elements as well", function() {
            var callbackCounter = 0;
            var callback = function() {
                callbackCounter++;
            };
            ClickElsewhere.onClickElsewhere(fixture.find("#click")[0], callback);
            fixture.find("#other-element").click();
            expect(callbackCounter).toBe(1);
        });
    });

    describe("removeOnClickElsewhere", function() {
        it("successfully removes event", function() {
            var callbackRun = false;
            var callback = function() {
                callbackRun = true;
            };
            ClickElsewhere.onClickElsewhere(fixture.find("#click"), callback);
            ClickElsewhere.removeOnClickElsewhere(fixture.find("#click"));
            fixture.find("#other-element").click();
            expect(callbackRun).toBe(false);
        });

        it("removes from dom element removes event", function() {
            var callbackRun = false;
            var callback = function() {
                callbackRun = true;
            };
            ClickElsewhere.onClickElsewhere(fixture.find("#click"), callback);
            ClickElsewhere.removeOnClickElsewhere(fixture.find("#click")[0]);
            fixture.find("#other-element").click();
            expect(callbackRun).toBe(false);
        });

        it("removes from jquery removes event", function() {
            var callbackRun = false;
            var callback = function() {
                callbackRun = true;
            };
            ClickElsewhere.onClickElsewhere(fixture.find("#click")[0], callback);
            ClickElsewhere.removeOnClickElsewhere(fixture.find("#click"));
            fixture.find("#other-element").click();
            expect(callbackRun).toBe(false);
        });
    });

    describe("JqueryPlugin", function() {
        describe("onClickElsewhere", function() {
            it("invokes callback when other element clicked", function() {
                var callbackRun = false;
                var callback = function() {
                    callbackRun = true;
                };
                $("#click").onClickElsewhere(callback);
                fixture.find("#other-element").click();
                expect(callbackRun).toBe(true);
            });

            it("only attaches once", function() {
                var callbackCounter = 0;
                var callback = function() {
                    callbackCounter++;
                };
                $("#click").onClickElsewhere(callback);
                fixture.find("#other-element").click();
                expect(callbackCounter).toBe(1);
            });
        });

        describe("removeOnClickElsewhere", function() {
            it("successfully removes event", function() {
                var callbackRun = false;
                var callback = function() {
                    callbackRun = true;
                };
                $("#click").onClickElsewhere(callback);
                $("#click").removeOnClickElsewhere();
                fixture.find("#other-element").click();
                expect(callbackRun).toBe(false);
            });
        });
    });
});


