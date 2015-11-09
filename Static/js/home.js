$(document).ready(function(){
	
}); 

(function($) {
	$(function(e) {

		$('.signupCustom').click(function(){
			var email = $('#form-email').val()
			var password = $('#pass').val()
			var firstName= $('#form-first-name').val()
			var lastName= $('#form-last-name').val()
			var number= $('#form-mobile').val()
			var type=$('#sel1').val()

			$.ajax({
				url: '/login',
				type: 'GET',
				data: {
					'email': email,
					'password':password,
					'firstName':firstName,
					'lastName':lastName,
					'number':number,
					'type':type
				},
				success: function(data){
					window.location.href = "/";
				}
			})
		})
		
		$('.login').click(function(){
			var email = $('#form-username').val()
			var password= $('#form-password').val()
			$.ajax({
				url: '/loginCustom',
				type: 'GET',
				data: {
					'email': email,
					'password':password
				},
				success: function(data){
					window.location.href = "/";
				}
			})
		})

		$('.logoutbutton').click(function(){

			$.ajax({
			
				type: 'GET',
				url: '/logout',
				success:function(data){

					window.location.href= "/";
				}
			});	
		})


	});

	
})(jQuery);

