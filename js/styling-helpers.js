function updateStyling(targetAnswer, targetBrowser) {
  const elementToUpdate = removeStyling(targetAnswer, targetBrowser);
  elementToUpdate.classList.add(targetAnswer);
}

function removeStyling(targetAnswer, targetBrowser) {
  const regex = /(([a-z]*[-]{1})\w*)/;
  console.log(`target answer is: ${targetAnswer}`);
  console.log(targetAnswer.match(regex)[0]);
  let elementToUpdate = '';
  if (targetBrowser){
    console.log('targetBrowser');
    console.low(`#${targetBrowser} .${targetAnswer.match(regex)[0]}`);
    elementToUpdate = document.querySelector(`#${targetBrowser} .${targetAnswer.match(regex)[0]}`);
  } else {
    elementToUpdate = document.querySelector(`.${targetAnswer.match(regex)[0]}`);
  }
  
  console.log(`Element to update is: ${elementToUpdate}`);
  const classListPos1 = elementToUpdate.classList.item(1);
  if (classListPos1 !== null) {
    elementToUpdate.classList.remove(elementToUpdate.classList.item(1));
  }
  return elementToUpdate;
}