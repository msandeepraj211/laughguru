angular.module('testApp',['ui.router']).controller('mainCtrl',['$scope','$http','$state',function($scope,$http,$state){
	$scope.score=0;
	console.log('yes running');
	$scope.startTest=function(test){
		$http.get('/test/'+test).success(function(data,status){
			$state.transitionTo('test');
			$scope.results=data;
			$scope.testScore=0;
			$scope.QuestionNo=0;
		});
	}
	window.scope=$scope
	$scope.optionSubmitted= function(Qindex,index){
		if(!$scope.results[Qindex].answered){
			$scope.results[Qindex].answered=true;
			if($scope.results[Qindex].choices[index].answer){
				$scope.testScore=$scope.testScore+100;
			}else{
				$scope.results[Qindex].choices[index].wrongAnswer= true;
			}
		}
		/*$scope.$apply();*/
	};
	$scope.nextQuestion=function(){
		$scope.QuestionNo=$scope.QuestionNo+1;
	};
	$scope.resultPage=function(){
		$state.transitionTo('result');
		$scope.score=$scope.score+$scope.testScore;
		$scope.progress=Math.floor($scope.testScore/1.5);
	};
	$scope.levelArc=function(value){
		console.log('fn called'+ new Date().getTime())
		if(value>=100){
			var rp1 = radialProgress(document.getElementById('levelArc'))
                .label("Progress")
                .diameter(150)
                .value(100)
                .render();
            setTimeout(function(){$scope.levelArc(value-100)}, 1000);
		}else{
			var rp1 = radialProgress(document.getElementById('levelArc'))
                .label("Progress")
                .diameter(150)
                .value(value)
                .render();
		}
	}
	$scope.home=function(){
		$state.transitionTo('default');
	}
	$scope.home();

}]).config(['$stateProvider', function ($stateProvider) {
        $stateProvider
            .state('test', {
                templateUrl: '/partials/questions.html'
            })
            .state('result', {
                templateUrl: '/partials/result.html'
            })
            .state('default', {
                templateUrl: '/partials/default.html'
            })
    }])