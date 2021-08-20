const form = document.getElementById("form");

form.addEventListener("submit", (e) => {
  for (let i = 1; i < 18; i++) {
    const mobile = document.getElementById("Mobile" + i);
    const validity = document.getElementById("validity" + i);
    const num = document.getElementById("number" + i);
    const type = document.getElementById("type" + i);
    const provider = document.getElementById("provider" + i);

    var numArray = [];
    let numberFiltered = numberArrayFill(mobile.value);

    let validLength = checkLength(numberFiltered.length);

    if (validLength) {
      validity.innerHTML = "Valid Phone Number";
    } else {
      validity.innerHTML = "Phone Number Is Invalid";
    }

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
              return false;
            }
          case 11:
            if (numArray[0] == "9") {
              return checkStructure(numArray) ? true : false;
            } else {
              return false;
            }
        }
      } else {
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
            num.innerHTML = numString;
            return true;
          } else {
            return false;
          }
        }
        if (numArray[2] != 7) {
          let valid_H_Pro = landlineArea(numArray[2], numArray[3], numArray[4]);
          if (valid_H_Pro) {
            num.innerHTML = numString;
            return true;
          } else {
            return false;
          }
        }
      } else {
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
            type.innerHTML = "Mobile";
            provider.innerHTML = "SLT Mobitel";
            break;
          case "2":
          case "8":
            type.innerHTML = "Mobile";
            provider.innerHTML = "Hutch";
            break;
          case "4":
          case "6":
          case "7":
            type.innerHTML = "Mobile";
            provider.innerHTML = "Dialog";
            break;
          case "5":
            type.innerHTML = "Mobile";
            provider.innerHTML = "Airtel";
            break;
        }
        return true;
      } else {
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
      if (valid_L) {
        let validProvider = landlineProvider(code3);
        if (validProvider) {
          return true;
        } else {
          return false;
        }
      } else {
        return false;
      }
    }

    function landlineProvider(code) {
      switch (code) {
        case "0":
          type.innerHTML = "Fixed";
          provider.innerHTML = "Lanka Bell Fixed LTE";
          return true;
        case "1":
        case "6":
        case "8":
          return false;
        case "2":
        case "3":
          type.innerHTML = "Fixed";
          provider.innerHTML = "SLTMobitel Fixed";
          return true;
        case "4":
        case "7":
          type.innerHTML = "Fixed";
          provider.innerHTML = "Dialog Fixed LTE";
          return true;
        case "5":
          type.innerHTML = "Fixed";
          provider.innerHTML = "Lanka Bell Fixed CDMA";
          return true;
        case "9":
          type.innerHTML = "Fixed";
          provider.innerHTML = "Public Pay Phone";
          return true;
      }
    }
  }
  e.preventDefault();
});
