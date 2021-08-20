let check = document.querySelector(".check");
let number = document.querySelector(".number");
let text = document.querySelector(".text");
const valid = document.getElementById("valid");
const type = document.getElementById("type");
const provider = document.getElementById("provider");

let numArray = [];

function numberArrayFill(number) {
  numArray = number.split("");

  // Remove characters
  for (var i = numArray.length; i--; ) {
    if (
      numArray[i] === "." ||
      numArray[i] === "+" ||
      numArray[i] === "-" ||
      numArray[i] === " " ||
      numArray[i] === "(" ||
      numArray[i] === ")"
    ) {
      numArray.splice(i, 1);
    }
  }
  return numArray;
}

//Length Check
function checkLength(length) {
  if (length < 12 && length > 8) {
    switch (length) {
      case 9:
        numArray.unshift("9", "4");
        return checkStructure(numArray) ? true : false;
      case 10:
        if (numArray[0] == "0") {
          numArray.shift();
          numArray.unshift("9", "4");
          return checkStructure(numArray) ? true : false;
        } else {
          window.alert("Please Check The Number (Length is Incorrect)");
          return false;
        }
      case 11:
        if (numArray[0] == "9") {
          return checkStructure(numArray) ? true : false;
        } else {
          window.alert("Please Check The Number (Length is Incorrect)");
          return false;
        }
    }
  } else {
    window.alert("Please Check The Number (Length is Incorrect)");
    return false;
  }
}

//Structure Check
function checkStructure(numArray) {
  let regex = /[9]{1}[4]{1}[1-9]{2}[0-9]{1}[0-9]{6}/;
  let numString = numArray.join("");
  if (numString.match(regex)) {
    //Mobile/Landline
    if (numArray[2] == 7) {
      let valid_M_Pro = mobileProvider(numArray[3]);
      if (valid_M_Pro) {
        document.getElementById("valid").innerHTML = "Number : " + numString;
        return true;
      } else {
        return false;
      }
    }
    if (numArray[2] != 7) {
      let valid_H_Pro = landlineArea(numArray[2], numArray[3], numArray[4]);
      if (valid_H_Pro) {
        document.getElementById("valid").innerHTML = "Number : " + numString;
        return true;
      } else {
        return false;
      }
    }
  } else {
    window.alert("Please Enter A Valid Number");
    return false;
  }
}

//Mobile ? Provider Identify
function mobileProvider(code) {
  let provideCode = ["0", "1", "2", "8", "4", "6", "7", "5"];
  let valid_M = provideCode.includes(code);
  if (valid_M) {
    switch (code) {
      case "0":
      case "1":
        document.getElementById("type").innerHTML = "Type : Mobile";
        document.getElementById("provider").innerHTML =
          "Service Provider: SLT Mobitel";
        break;
      case "2":
      case "8":
        document.getElementById("type").innerHTML = "Type : Mobile";
        document.getElementById("provider").innerHTML =
          "Service Provider: Hutch";
        break;
      case "4":
      case "6":
      case "7":
        document.getElementById("type").innerHTML = "Type : Mobile";
        document.getElementById("provider").innerHTML =
          "Service Provider: Dialog";
        break;
      case "5":
        document.getElementById("type").innerHTML = "Type : Mobile";
        document.getElementById("provider").innerHTML =
          "Service Provider: Airtel";
        break;
    }
    return true;
  } else {
    window.alert("Please Enter A Valid Number");
    return false;
  }
}

//Landline ? Provider Identify
function landlineArea(code1, code2, code3) {
  let numArea = [code1, code2];
  let numAreaString = numArea.join("");
  let AreaCode = [
    "11",
    "36",
    "31",
    "33",
    "38",
    "34",
    "81",
    "54",
    "51",
    "52",
    "66",
    "91",
    "41",
    "47",
    "21",
    "23",
    "24",
    "63",
    "65",
    "67",
    "26",
    "25",
    "27",
    "32",
    "37",
    "55",
    "57",
    "45",
    "35",
  ];
  let valid_L = AreaCode.includes(numAreaString);
  console.log("Valid Landline", valid_L);
  if (valid_L) {
    let validProvider = landlineProvider(code3);
    if (validProvider) {
      return true;
    } else {
      window.alert("Please Enter A Valid Number");
      return false;
    }
  } else {
    window.alert("Please Enter A Valid Number");
    return false;
  }
}

function landlineProvider(code) {
  switch (code) {
    case "0":
      document.getElementById("type").innerHTML = "Type : Home";
      document.getElementById("provider").innerHTML =
        "Service Provider: Lanka Bell	Fixed LTE";
      return true;
    case "1":
    case "6":
    case "8":
      return false;
    case "2":
    case "3":
      document.getElementById("type").innerHTML = "Type : Home";
      document.getElementById("provider").innerHTML =
        "Service Provider: SLTMobitel Fixed";
      return true;
    case "4":
    case "7":
      document.getElementById("type").innerHTML = "Type : Home";
      document.getElementById("provider").innerHTML =
        "Service Provider: Dialog	Fixed LTE";
      return true;
    case "5":
      document.getElementById("type").innerHTML = "Type : Home";
      document.getElementById("provider").innerHTML =
        "Service Provider: Lanka Bell Fixed CDMA";
      return true;
    case "9":
      document.getElementById("type").innerHTML = "Type : Home";
      document.getElementById("provider").innerHTML =
        "Service Provider: Public Pay Phone";
      return true;
  }
}

check.addEventListener("click", () => {
  if (number.value != " ") {
    let numberFiltered = numberArrayFill(number.value);

    let validLength = checkLength(numberFiltered.length);

    if (validLength) {
      text.innerText = "Valid Phone Number";
      text.style.color = "rgba(4,125,9,1)";
    } else {
      text.innerText = "Phone Number Is Invalid";
      text.style.color = "#da3400";
    }
  } else {
    text.innerText = "Please Enter Your Phone Number";
    text.style.color = "#fff";
  }
});
