function updateStyling(targetAnswer) {
  const elementToUpdate = removeStyling(targetAnswer);
  elementToUpdate.classList.add(targetAnswer);
}

function removeStyling(targetAnswer) {
  const regex = /(([a-z]*[-]{1})\w*)/;
  console.log(`target answer is: ${targetAnswer}`);
  console.log(targetAnswer.match(regex)[0]);
  const elementToUpdate = document.querySelector(`.${targetAnswer.match(regex)[0]}`);
  console.log(`Element to update is: ${elementToUpdate}`);
  const classListPos1 = elementToUpdate.classList.item(1);
  if (classListPos1 !== null) {
    elementToUpdate.classList.remove(elementToUpdate.classList.item(1));
  }
  return elementToUpdate;
}