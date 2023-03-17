// HANDLE AMOUNT TYPE

export const checkIfNumber = (event) => {
  /**
   * Allowing: Integers | Backspace | Tab | Delete | Left & Right arrow keys
   **/

  const regex = new RegExp(
    /(^\d*$)|(Backspace|Tab|Delete|ArrowLeft|ArrowRight)/
  );

  return !event.key.match(regex) && event.preventDefault();
};
