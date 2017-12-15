var myApp = angular.module('myApp', []);

myApp.controller("mortgage-calculator", ['$scope', function ($scope) {
    $scope.homePrice = '400000';
    $scope.homePriceErr = '';

    $scope.downPayment = '80000';
    $scope.downPaymentErr = '';
    $scope.downPaymentPercent = '20';

    $scope.interestRate = '3.800';
    $scope.interestRateErr = '';

    $scope.hoaFee = '0';
    $scope.hoaFeeErr = '';

    $scope.loanType = '30';

    $scope.propertyTax = '0';
    $scope.propertyTaxErr = '';

    $scope.homeInsurance = '0';
    $scope.homeInsuranceErr = '';

    $scope.otherPayments = '0';
    $scope.otherPaymentsErr = '';

    $scope.showMoreOptions = false;

    $scope.monthlyPayment = '1,491';

    $scope.chartLabel = ["Principal & Interest - $1,491"];
    $scope.chartData = [1491];


    $scope.validateInput = function (field) {
        switch (field) {
            case 'homePrice':
                var num = $scope.homePrice.toString();
                var num = num.replace(/,/g, '');

                if (num.includes('.')) {
                    $scope.homePriceErr = 'Please enter integer only, no decimal';
                } else if (num != '' && (isNaN(parseInt(num)) || !isFinite(num))) {
                    $scope.homePriceErr = 'Please enter number only';
                } else if (num == '' || (!isNaN(parseInt(num)) && isFinite(num))) {
                    if (parseInt(num) < 0 || parseInt(num) > 1000000) {
                        $scope.homePriceErr = 'Please enter number between 0 and 1,000,000';
                    } else {
                        $('#homePriceRange').range('set value', parseInt(num));
                        $scope.homePrice = num.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
                        $scope.homePriceErr = '';
                        updateDownPaymentPercentage();
                    }
                }

                if ($scope.homePriceErr != '') {
                    $('#homePriceErr').html('<p>' + $scope.homePriceErr + '</p>');
                } else {
                    $('#homePriceErr').html('<p></p>');
                }
                break;
            case 'downPayment':
                var num = $scope.downPayment.toString();
                var num = num.replace(/,/g, '');

                if (num == '') {
                    $scope.downPaymentErr = '';
                } else {
                    if (num.includes('.')) {
                        $scope.downPaymentErr = 'Please enter integer only, no decimal number';
                    } else if (num != '' && (isNaN(parseInt(num)) || !isFinite(num))) {
                        $scope.downPaymentErr = 'Please enter number only';
                    } else if (!isNaN(parseInt(num)) && isFinite(num)) {
                        if (parseInt(num) > 500000) {
                            $scope.downPaymentErr = 'Please enter number between 0 and 500,000';
                        } else {
                            $('#downPaymentRange').range('set value', parseInt(num));
                            $scope.downPayment = num.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
                            $scope.downPaymentErr = '';
                            updateDownPaymentPercentage();
                        }
                    }
                }

                if ($scope.downPaymentErr != '') {
                    $('#downPaymentErr').html('<p>' + $scope.downPaymentErr + '</p>');
                } else {
                    $('#downPaymentErr').html('<p></p>');
                }
                break;
            case 'downPaymentPercent':
                var num = $scope.downPaymentPercent.toString();

                if (num.includes('.')) {
                    $scope.downPaymentErr = 'Please enter integer only, no decimal';
                } else if (num != '' && (isNaN(parseInt(num)) || !isFinite(num))) {
                    $scope.downPaymentErr = 'Please enter number only';
                } else if (num == '' || (!isNaN(parseInt(num)) && isFinite(num))) {
                    if (parseInt(num) < 0 || parseInt(num) > 100) {
                        $scope.downPaymentErr = 'Please enter number between 0 and 100';
                    } else {
                        if (parseInt(num) > 0) {
                            updateDownPayment();
                            $scope.downPaymentErr = '';
                        }
                    }
                }

                if ($scope.downPaymentErr != '') {
                    $('#homePriceErr').html('<p>' + $scope.downPaymentErr + '</p>');
                } else {
                    $('#homePriceErr').html('<p></p>');
                }
                break;
            case 'interestRate':
                var num = $scope.interestRate.toString();

                if (num.includes(',')) {
                    $scope.interestRateErr = 'Please enter a valid decimal number';
                } else if (num != '' && (isNaN(parseFloat(num)) || !isFinite(num))) {
                    $scope.interestRateErr = 'Please enter number only';
                } else if (num == '' || (!isNaN(parseFloat(num)) && isFinite(num))) {
                    if (parseFloat(num) < 0 || parseFloat(num) > 8.000) {
                        $scope.interestRateErr = 'Please enter decimal between 0 to 8.000';
                    } else {
                        $('#interestRateRange').range('set value', parseFloat(num));
                        $scope.interestRateErr = '';
                    }
                }

                if ($scope.interestRateErr != '') {
                    $('#interestRateErr').html('<p>' + $scope.interestRateErr + '</p>');
                } else {
                    $('#interestRateErr').html('<p></p>');
                }
                break;
            case 'hoaFee':
                var num = $scope.hoaFee.toString();
                var num = num.replace(/,/g, '');

                if (num.includes('.')) {
                    $scope.hoaFeeErr = 'Please enter integer only, no decimal';
                } else if (num != '' && (isNaN(parseInt(num)) || !isFinite(num))) {
                    $scope.hoaFeeErr = 'Please enter number only';
                } else if (num == '' || (!isNaN(parseInt(num)) && isFinite(num))) {
                    if (parseInt(num) < 0 || parseInt(num) > 800) {
                        $scope.hoaFeeErr = 'Please enter number between 0 and 800';
                    } else {
                        $('#hoaDuesRange').range('set value', parseInt(num));
                        $scope.hoaFee = num.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
                        $scope.hoaFeeErr = '';
                    }
                }

                if ($scope.hoaFeeErr != '') {
                    $('#hoaFeeErr').html('<p>' + $scope.hoaFeeErr + '</p>');
                } else {
                    $('#hoaFeeErr').html('<p></p>');
                }
                break;
            case 'loanType':
                // console.log($scope.loanType);
                break;
            case 'propertyTax':
                var num = $scope.propertyTax.toString();

                if (num.includes(',')) {
                    $scope.propertyTaxErr = 'Please enter a valid decimal number';
                } else if (num != '' && (isNaN(parseFloat(num)) || !isFinite(num))) {
                    $scope.propertyTaxErr = 'Please enter number only';
                } else if (num == '' || (!isNaN(parseFloat(num)) && isFinite(num))) {
                    if (parseFloat(num) < 0 || parseFloat(num) > 4.000) {
                        $scope.propertyTaxErr = 'Please enter decimal between 0 to 4.000';
                    } else {
                        $('#propertyTaxRange').range('set value', parseFloat(num));
                        $scope.propertyTaxErr = '';
                    }
                }

                if ($scope.propertyTaxErr != '') {
                    $('#propertyTaxErr').html('<p>' + $scope.propertyTaxErr + '</p>');
                } else {
                    $('#propertyTaxErr').html('<p></p>');
                }

                break;
            case 'homeInsurance':
                var num = $scope.homeInsurance.toString();
                var num = num.replace(/,/g, '');

                if (num.includes('.')) {
                    $scope.homeInsuranceErr = 'Please enter integer only, no decimal';
                } else if (num != '' && (isNaN(parseInt(num)) || !isFinite(num))) {
                    $scope.homeInsuranceErr = 'Please enter number only';
                } else if (num == '' || (!isNaN(parseInt(num)) && isFinite(num))) {
                    if (parseInt(num) < 0 || parseInt(num) > 10000) {
                        $scope.homeInsuranceErr = 'Please enter number between 0 and 10000';
                    } else {
                        $('#homeInsuranceRange').range('set value', parseInt(num));
                        $scope.homeInsurance = num.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
                        $scope.homeInsuranceErr = '';
                    }
                }

                if ($scope.homeInsuranceErr != '') {
                    $('#homeInsuranceErr').html('<p>' + $scope.homeInsuranceErr + '</p>');
                } else {
                    $('#homeInsuranceErr').html('<p></p>');
                }
                break;
            case 'otherPayments':
                var num = $scope.otherPayments.toString();
                var num = num.replace(/,/g, '');

                if (num.includes('.')) {
                    $scope.otherPaymentsErr = 'Please enter integer only, no decimal';
                } else if (num != '' && (isNaN(parseInt(num)) || !isFinite(num))) {
                    $scope.otherPaymentsErr = 'Please enter number only';
                } else if (num == '' || (!isNaN(parseInt(num)) && isFinite(num))) {
                    if (parseInt(num) < 0 || parseInt(num) > 100000) {
                        $scope.otherPaymentsErr = 'Please enter number between 0 and 100000';
                    } else {
                        $('#otherPaymentRange').range('set value', parseInt(num));
                        $scope.otherPayments = num.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
                        $scope.otherPaymentsErr = '';
                    }
                }

                if ($scope.otherPaymentsErr != '') {
                    $('#otherPaymentsErr').html('<p>' + $scope.otherPaymentsErr + '</p>');
                } else {
                    $('#otherPaymentsErr').html('<p></p>');
                }

                break;
            default:
                console.log('invalid input field');
        }

        reCalculateMonthlyPayment();
    };

    $scope.drawChart = function () {
        var canvas = document.getElementById("myChart");
        var ctx = canvas.getContext('2d');

        canvas.width = '400';
        canvas.height = '400';

        var myChart = new Chart(ctx, {
            type: 'pie',
            data: {
                labels: $scope.chartLabel,
                datasets: [{
                    label: 'monthly payment',
                    data: $scope.chartData,
                    backgroundColor: [
                        'rgba(255, 99, 132, 0.2)',
                        'rgba(54, 162, 235, 0.2)',
                        'rgba(255, 206, 86, 0.2)',
                        'rgba(75, 192, 192, 0.2)',
                        'rgba(153, 102, 255, 0.2)',
                        'rgba(255, 159, 64, 0.2)'
                    ],
                    borderColor: [
                        'rgba(255,99,132,1)',
                        'rgba(54, 162, 235, 1)',
                        'rgba(255, 206, 86, 1)',
                        'rgba(75, 192, 192, 1)',
                        'rgba(153, 102, 255, 1)',
                        'rgba(255, 159, 64, 1)'
                    ],
                    borderWidth: 1
        }]
            },
            options: {
                tooltips: {
                    enabled: false
                },
                events: [],
                legend: {
                    display: true,
                    position: 'bottom'
                },
                responsive: true,
                maintainAspectRatio: false
            }
        });
    };

    $scope.drawChart();

    var reCalculateMonthlyPayment = function () {
        var homePrice = parseInt($scope.homePrice.replace(/,/g, ''));
        var homeInsurance = parseInt(parseInt($scope.homeInsurance.replace(/,/g, '')));
        var otherPayments = parseInt($scope.otherPayments.replace(/,/g, ''));

        var loanValue = homePrice - parseInt($scope.downPayment.replace(/,/g, ''))
        var montlyPrincipleAndInterest = 0;
        var tmpMonthlyPayment = 0;

        var finalHoaFee = 0;
        var finalPropertyTax = 0;
        var finalHomeInsurance = 0;
        var finalOtherPayments = 0;

        $scope.chartLabel = [];
        $scope.chartData = [];

        if (!isNaN(parseInt(homePrice)) && isFinite(homePrice) && homePrice > 0) {
            // if interest rate is 0
            if ($scope.interestRate == '0') {
                montlyPrincipleAndInterest = homePrice / (parseInt($scope.loanType) * 12);
            } else {
                var rate = parseFloat($scope.interestRate);
                montlyPrincipleAndInterest = ((rate / 100 / 12) * loanValue) / (1 - (Math.pow(1 + (rate / 100 / 12), -1 * parseInt($scope.loanType) * 12)))
            }
            tmpMonthlyPayment = montlyPrincipleAndInterest.toFixed() > 0 ? montlyPrincipleAndInterest.toFixed() : 0;

            var formattedPayment = tmpMonthlyPayment.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
            $scope.chartLabel.push("Principle & Interest - $" + formattedPayment);
            $scope.chartData.push(parseInt(tmpMonthlyPayment));
            // calculate additional payment
            if ($scope.hoaFee != '0' && !isNaN(parseInt($scope.hoaFee)) && isFinite($scope.hoaFee)) {
                finalHoaFee = parseInt($scope.hoaFee);
                tmpMonthlyPayment = parseInt(tmpMonthlyPayment) + parseInt($scope.hoaFee);
                
                $scope.chartLabel.push("HOA - $" + finalHoaFee);
                $scope.chartData.push(parseInt(finalHoaFee));
            }

            if ($scope.propertyTax != '0' && !isNaN(parseFloat($scope.propertyTax)) && isFinite($scope.propertyTax)) {
                finalPropertyTax = homePrice * (parseFloat($scope.propertyTax) / 100) / 12;
                finalPropertyTax = Math.round(finalPropertyTax);
                $scope.chartLabel.push("Property Taxes - $" + finalPropertyTax);
                $scope.chartData.push(finalPropertyTax);

                tmpMonthlyPayment = parseInt(tmpMonthlyPayment) + finalPropertyTax;
            }

            if (homeInsurance != 0 && !isNaN(homeInsurance) && isFinite(homeInsurance)) {
                finalHomeInsurance = homeInsurance / 12;
                finalHomeInsurance = Math.round(finalHomeInsurance);
                $scope.chartLabel.push("Home Insurance - $" + finalHomeInsurance);
                $scope.chartData.push(finalHomeInsurance);

                tmpMonthlyPayment = parseInt(tmpMonthlyPayment) + finalHomeInsurance;
            }

            if (otherPayments != 0 && !isNaN(otherPayments) && isFinite(otherPayments)) {
                finalOtherPayments = otherPayments / 12;
                finalOtherPayments = Math.round(finalOtherPayments);
                
                var formattedOtherPayment = finalOtherPayments.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
                $scope.chartLabel.push("Other Payments - $" + formattedOtherPayment);
                $scope.chartData.push(finalOtherPayments);

                tmpMonthlyPayment = parseInt(tmpMonthlyPayment) + finalOtherPayments;
            }

        } else {
            // monthly payment is 0
            tmpMonthlyPayment = 0;
        }

        // update chart
        $scope.drawChart();

        $scope.monthlyPayment = tmpMonthlyPayment > 0 ? tmpMonthlyPayment.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") : '0';
        $('#monthlyPayment').val($scope.monthlyPayment);
    }

    var updateDownPayment = function () {
        var downPaymentTemp = computeDownPaymentFromPercentage($scope.homePrice, parseInt($scope.downPaymentPercent.replace(/,/g, '')));
        if (downPaymentTemp > 0 && downPaymentTemp <= 500000) {
            $('#downPaymentRange').range('set value', downPaymentTemp);
            $scope.downPayment = downPaymentTemp.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
        }
    }

    var updateDownPaymentPercentage = function () {
        var homePrice = parseInt($scope.homePrice.replace(/,/g, ''));
        if (!isNaN(parseInt(homePrice)) && isFinite(homePrice) && homePrice > 0) {
            var downPayment = parseInt($scope.downPayment.replace(/,/g, ''));
            $scope.downPaymentPercent = Math.round(downPayment / homePrice * 100).toString();
            $scope.downPaymentPercent = $scope.downPaymentPercent > 100 ? 100 : $scope.downPaymentPercent;
        } else {
            $scope.downPaymentPercent = '0';
        }
    };

    var computeDownPaymentFromPercentage = function (homePrice, downPaymentPercent) {
        var homePriceVal = parseInt(homePrice.replace(/,/g, ''));

        if (homePriceVal > 0) {
            var result = Math.round(homePriceVal * (downPaymentPercent / 100.00))
            return result;
        } else {
            return 0;
        }
    }

    $scope.toggleMoreOptions = function () {
        $scope.showMoreOptions = !$scope.showMoreOptions;
        if ($scope.showMoreOptions) {
            $('#moreOptions').html('Hide Options');
        } else {
            $('#moreOptions').html('More Options');
        }
    };

    $('#homePriceRange').range({
        min: 0,
        max: 1000000,
        start: 400000,
        step: 1000,
        onChange: function (value, meta) {
            if (meta.triggeredByUser) {
                $scope.homePrice = value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
                $('#homePriceInput').val($scope.homePrice);
                updateDownPaymentPercentage();
                $('#downPaymentPercentInput').val($scope.downPaymentPercent);
                reCalculateMonthlyPayment();
                $('#monthlyPayment').text($scope.monthlyPayment);
            }
        }
    });

    $('#downPaymentRange').range({
        min: 0,
        max: 500000,
        start: parseInt($scope.downPayment),
        step: 1000,
        onChange: function (value, meta) {
            if (meta.triggeredByUser) {
                $scope.downPayment = value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
                $('#downPaymentInput').val($scope.downPayment);
                updateDownPaymentPercentage();
                $('#downPaymentPercentInput').val($scope.downPaymentPercent);
                reCalculateMonthlyPayment();
                $('#monthlyPayment').text($scope.monthlyPayment);
            }
        }
    });

    $('#interestRateRange').range({
        min: 0,
        max: 8.000,
        start: 3.800,
        step: 0.001,
        onChange: function (value, meta) {
            if (meta.triggeredByUser) {
                $scope.interestRate = value.toFixed(3).toString();
                $('#interestRateInput').val($scope.interestRate);
                reCalculateMonthlyPayment();
                $('#monthlyPayment').text($scope.monthlyPayment);
            }
        }
    });

    $('#hoaDuesRange').range({
        min: 0,
        max: 800,
        start: 0,
        step: 50,
        onChange: function (value, meta) {
            if (meta.triggeredByUser) {
                $scope.hoaFee = value.toString();
                $('#hoaInput').val($scope.hoaFee);
                reCalculateMonthlyPayment();
                $('#monthlyPayment').text($scope.monthlyPayment);
            }
        }
    });

    $('#propertyTaxRange').range({
        min: 0,
        max: 4.000,
        start: 0,
        step: 0.001,
        onChange: function (value, meta) {
            if (meta.triggeredByUser) {
                $scope.propertyTax = value.toString();
                $('#propertyTaxInput').val($scope.propertyTax);
                reCalculateMonthlyPayment();
                $('#monthlyPayment').text($scope.monthlyPayment);
            }
        }
    });

    $('#homeInsuranceRange').range({
        min: 0,
        max: 10000,
        start: 0,
        step: 50,
        onChange: function (value, meta) {
            if (meta.triggeredByUser) {
                $scope.homeInsurance = value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
                $('#homeInsuranceInput').val($scope.homeInsurance);
                reCalculateMonthlyPayment();
                $('#monthlyPayment').text($scope.monthlyPayment);
            }
        }
    });

    $('#otherPaymentRange').range({
        min: 0,
        max: 100000,
        start: 0,
        step: 100,
        onChange: function (value, meta) {
            if (meta.triggeredByUser) {
                $scope.otherPayments = value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
                $('#otherPaymentsInput').val($scope.otherPayments);
                reCalculateMonthlyPayment();
                $('#monthlyPayment').text($scope.monthlyPayment);
            }
        }
    });

    $(document).keypress(function (e) {
        if (e.which == 13) {
            return false;
        }
    });
}]);
