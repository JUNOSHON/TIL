//bad
const superman = {
  default: {clark: "juno"},
  private: true,
};

//good
const superman = {
  defaults: {clark: "juno"},
  hidden: true,
};

//bad
const superman = {
  class: "alien",
};

//bad
const superman = {
  klass: "alien",
};

//good
const superman = {
  type: "alien",
};
