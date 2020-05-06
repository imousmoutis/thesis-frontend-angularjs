app.factory('LexiconService', function ($http, CONSTANTS) {

  return {
    getLanguages: function () {
      return $http.get(CONSTANTS.BASE + 'lexicon/languages');
    }
  };
});
