let form = document.querySelector('#form');
let username = document.querySelector('#username');
let email = document.querySelector('#email');
let password1 = document.querySelector('#password1');
let password2 = document.querySelector('#password2');

// Declare the two function to display an error or success message
// Display error
function displayError(input, message) {
	// Grab the form control associated to the input with error
	const formControl = input.parentElement;
	formControl.className = 'form-control error';
	const small = formControl.querySelector('small');
	small.innerText = message;
}

// Display success
function displaySuccess(input) {
	// Grab the form control associated to the input with error
	const formControl = input.parentElement;
	formControl.className = 'form-control success';
}

// Check input is required
function checkRequired(inputs) {
	inputs.forEach((each) => {
		if (each.value.trim() === '') {
			displayError(each, `${fieldName(each)} is required`);
		} else {
			displaySuccess(each);
		}
	});
}

// Check username for values which are not allowed
function checkUsername(input) {
	const re = /^\w+$/
	if (input.value.length < 5) {
		displayError(input, `${fieldName(input)} must be at least 5 characters`);
	} else if (input.value.length > 30) {
		displayError(input, `${fieldName(input)} must be less than 30 characters`);
	} else {
		if(re.test(input.value.trim())) {
			displaySuccess(input);
		} else {
			displayError(input, "Letters, numbers and underscores only")
		}
	}
}

// Check email for the characters that aren't valid
function checkEmail(input) {
	const re = /^(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])$/
	if (input.value.length < 7) {
		displayError(input, `${fieldName(input)} must be at least 7 characters`);
	} else if (input.value.length > 254) {
		displayError(input, `${fieldName(input)} must be less than 254 characters`);
	} else {
		if(re.test(input.value.trim())) {
			displaySuccess(input);
		} else {
			displayError(input, "Email is not valid")
		}
	}
}

// Check password
function checkPassword(input) {
	const re =/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{0,}$/
	if (input.value.length < 8) {
		displayError(input, `${fieldName(input)} must be at least 8 characters`);
	} else if (input.value.length > 254) {
		displayError(input, `${fieldName(input)} must be less than 254 characters`);
	} else {
		if(re.test(input.value.trim())) {
			console.log(re.test(input.value.trim()));
			displaySuccess(input);
		} else {
			displayError(input, "Password must have a letter and a digit")
		}
	}

}

// Check the passwords match
function checkPasswordsMatch(input1, input2) {
	if (input1.value.trim() !== input2.value.trim()) {
		displayError(input2, "Passwords don't match")
	}
}
// Return the field name from the id
function fieldName(field) {
	return field.id[0].toUpperCase() + field.id.slice(1);
}


// Add an event listener to check all the fields once the submit button is clicked
form.addEventListener('submit', (e) => {
	e.preventDefault();

	checkRequired([username, email, password1, password2]);
	checkUsername(username);
	checkEmail(email);
	checkPassword(password1);
	checkPasswordsMatch(password1, password2);
});