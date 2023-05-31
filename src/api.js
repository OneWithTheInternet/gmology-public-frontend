const apiUrl =
  process.env.REACT_APP_API_ADDRESS + process.env.REACT_APP_API_VERSION;

/**
 * AJAX request that returns a promise with the JSON file.
 * Works for all requests by changing arguments.
 * @param {*} api
 * @param {*} verb
 * @param {*} data
 */
const makeRequest = {
  auth: {
    createUser: async (userInput) => {
      try {
        const requestResponse = await fetch(apiUrl + "/auth/signup", {
          method: "POST",
          mode: "cors",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(userInput),
        });
        const response = await requestResponse.json();
        if (!response[0].errors) {
          return response;
        } else {
          return [{ error: response[0].errors[0].message }];
        }
      } catch (error) {
        return [{ error: error.message }];
      }
    },

    loginUser: async (userInput) => {
      try {
        const requestResponse = await fetch(apiUrl + "/auth/login", {
          method: "POST",
          mode: "cors",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(userInput),
        });
        const response = await requestResponse.json();
        if (!response[0].errors) {
          return response;
        } else {
          return [{ error: response[0].errors[0].message }];
        }
      } catch (error) {
        return [{ error: error.message }];
      }
    },

    /**
     * Requests password reset link to be sent to user's email address
     * @param {*} userInput
     * @returns Object with success or error message
     */
    forgotPassword: async (userInput) => {
      try {
        const requestResponse = await fetch(apiUrl + "/auth/forgot_password", {
          method: "POST",
          mode: "cors",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(userInput),
        });
        const response = await requestResponse.json();
        if (!response[0].errors) {
          return response;
        } else {
          return [{ error: response[0].errors[0].message }];
        }
      } catch (error) {
        return [{ error: error.message }];
      }
    },

    /**
     * Requests the users's password to be changed to a new one
     * Only for users that forget their password
     * @param {*} userInput
     * @returns Object with success or error message
     */
    resetPassword: async (userInput) => {
      try {
        const requestResponse = await fetch(apiUrl + `/auth/reset_password`, {
          method: "POST",
          mode: "cors",
          headers: {
            Authorization: "Bearer " + userInput.user.token,
            "Content-Type": "application/json",
          },
          body: JSON.stringify(userInput),
        });
        const response = await requestResponse.json();
        if (!response[0].errors) {
          return response;
        } else {
          return [{ error: response[0].errors[0].message }];
        }
      } catch (error) {
        return [{ error: error.message }];
      }
    },

    /**
     * Retrieves information of user making the request.
     * Private infromation inclueded.
     * @returns object containing users information
     */
    displayMyUserInfo: async () => {
      if (!localStorage.token) {
        return [{ error: "Only Logged in users can do this" }];
      }
      try {
        const requestResponse = await fetch(apiUrl + "/auth/user", {
          method: "GET",
          mode: "cors",
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        });
        const response = await requestResponse.json();
        if (!response[0].errors) {
          return response;
        } else {
          return [{ error: response[0].errors[0].message }];
        }
      } catch (error) {
        return [{ error: error.message }];
      }
    },

    editProfileInfo: async (userInput) => {
      if (!localStorage.token) {
        return [{ error: "Only Logged in users can do this" }];
      }
      try {
        const requestResponse = await fetch(apiUrl + "/auth/edit", {
          method: "POST",
          mode: "cors",
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),
            "Content-Type": "application/json",
          },
          body: JSON.stringify(userInput),
        });
        const response = await requestResponse.json();
        if (!response[0].errors) {
          return response;
        } else {
          return [{ error: response[0].errors[0].message }];
        }
      } catch (error) {
        return [{ error: error.message }];
      }
    },

    editEmail: async (userInput) => {
      if (!localStorage.token) {
        return [{ error: "Only Logged in users can do this" }];
      }
      try {
        const requestResponse = await fetch(apiUrl + "/auth/edit_email", {
          method: "POST",
          mode: "cors",
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),
            "Content-Type": "application/json",
          },
          body: JSON.stringify(userInput),
        });
        const response = await requestResponse.json();
        if (!response[0].errors) {
          return response;
        } else {
          return [{ error: response[0].errors[0].message }];
        }
      } catch (error) {
        return [{ error: error.message }];
      }
    },

    editUserPassword: async (userInput) => {
      if (!localStorage.token) {
        return [{ error: "Only Logged in users can do this" }];
      }
      try {
        const requestResponse = await fetch(apiUrl + "/auth/edit_password", {
          method: "POST",
          mode: "cors",
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),
            "Content-Type": "application/json",
          },
          body: JSON.stringify(userInput),
        });
        const response = await requestResponse.json();
        if (!response[0].errors) {
          return response;
        } else {
          return [{ error: response[0].errors[0].message }];
        }
      } catch (error) {
        return [{ error: error.message }];
      }
    },

    deleteUser: async () => {
      if (!localStorage.token) {
        return [{ error: "Only Logged in users can do this" }];
      }
      try {
        const requestResponse = await fetch(apiUrl + "/auth/delete_user", {
          method: "POST",
          mode: "cors",
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        });
        const response = await requestResponse.json();
        if (!response[0].errors) {
          return response;
        } else {
          return [{ error: response[0].errors[0].message }];
        }
      } catch (error) {
        return [{ error: error.message }];
      }
    },
  },

  emailvalidation: {
    /**
     * Updates database to reflect user being validated
     * @param {*} userInput
     * @returns Object with success or error message
     */
    validateUserEmail: async (userInput) => {
      try {
        const requestResponse = await fetch(
          apiUrl + `/email_validations/${userInput}`,
          {
            method: "GET",
            mode: "cors",
          }
        );
        const response = await requestResponse.json();
        if (!response[0].errors) {
          return response;
        } else {
          return [{ error: response[0].errors[0].message }];
        }
      } catch (error) {
        return [{ error: error.message }];
      }
    },
  },

  users: {
    /**
     * Request for one user's info
     * @param {Array} userInput desired user's ID
     * @returns desired user's info
     */
    displayOneUser: async (userInput) => {
      try {
        const requestResponse = await fetch(apiUrl + "/users/" + userInput, {
          method: "GET",
          mode: "cors",
        });
        const response = await requestResponse.json();
        if (!response[0].errors) {
          return response;
        } else {
          return [{ error: response[0].errors[0].message }];
        }
      } catch (error) {
        return [{ error: error.message }];
      }
    },

    /**
     * Request for one or more users' info
     * @param {Array} input desired users IDs
     * @returns Array of users objects
     */
    displayManyUser: async (input) => {
      try {
        const requestResponse = await fetch(apiUrl + "/users/get_many_users", {
          method: "POST",
          mode: "cors",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(input),
        });
        const response = await requestResponse.json();
        if (!response[0].errors) {
          return response;
        } else {
          return [{ error: response[0].errors[0].message }];
        }
      } catch (error) {
        return [{ error: error.message }];
      }
    },

    editAvatar: async (userInput) => {
      if (!localStorage.token) {
        return [{ error: "Only Logged in users can do this" }];
      }
      try {
        const requestResponse = await fetch(apiUrl + `/users/edit_avatar`, {
          method: "POST",
          mode: "cors",
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
          body: userInput,
        });
        const response = await requestResponse.json();
        if (!response[0].errors) {
          return response;
        } else {
          return [{ error: response[0].errors[0].message }];
        }
      } catch (error) {
        return [{ error: error.message }];
      }
    },

    removeAvatar: async () => {
      if (!localStorage.token) {
        return [{ error: "Only Logged in users can do this" }];
      }
      try {
        const requestResponse = await fetch(
          apiUrl + `/users/restore_default_avatar`,
          {
            method: "POST",
            mode: "cors",
            headers: {
              Authorization: "Bearer " + localStorage.getItem("token"),
            },
          }
        );
        const response = await requestResponse.json();
        if (!response[0].errors) {
          return response;
        } else {
          return [{ error: response[0].errors[0].message }];
        }
      } catch (error) {
        return [{ error: error.message }];
      }
    },

    editBio: async (userInput) => {
      if (!localStorage.token) {
        return [{ error: "Only Logged in users can do this" }];
      }
      try {
        const requestResponse = await fetch(apiUrl + `/users/edit_bio`, {
          method: "POST",
          mode: "cors",
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),
            "Content-Type": "application/json",
          },
          body: JSON.stringify(userInput),
        });
        const response = await requestResponse.json();
        if (!response[0].errors) {
          return response;
        } else {
          return [{ error: response[0].errors[0].message }];
        }
      } catch (error) {
        return [{ error: error.message }];
      }
    },
  },

  follows: {
    /**
     * Request to if source user follows target user
     * @param {object} userInput user to get followers information from
     * @returns array with object with a boolean attribute "isFollower" inside
     */
    isFollower: async (userInput) => {
      if (!localStorage.token) {
        return [{ error: "Only Logged in users can do this" }];
      }
      try {
        const requestResponse = await fetch(apiUrl + `/follows/isFollower`, {
          method: "POST",
          mode: "cors",
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
          body: JSON.stringify(userInput),
        });
        const response = await requestResponse.json();
        if (!response[0].errors) {
          return response;
        } else {
          return [{ error: response[0].errors[0].message }];
        }
      } catch (error) {
        return [{ error: error.message }];
      }
    },

    /**
     * Gets a user's amount of followers
     * @param {object} userInput user to get followers information from
     * @returns
     */
    getFollowsCount: async (userInput) => {
      try {
        const requestResponse = await fetch(apiUrl + `/follows/count`, {
          method: "POST",
          mode: "cors",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(userInput),
        });
        const response = await requestResponse.json();
        if (!response[0].errors) {
          return response;
        } else {
          return [{ error: response[0].errors[0].message }];
        }
      } catch (error) {
        return [{ error: error.message }];
      }
    },

    /**
     * Gets info of a user's followers
     * @param {object} userInput user to get followers information from
     * @param {number} page page to limit number of results
     * @returns
     */
    getFollows: async (userInput, page) => {
      if (!localStorage.token) {
        return [{ error: "Only Logged in users can do this" }];
      }
      try {
        const requestResponse = await fetch(
          apiUrl + `/follows/display_followers?page=${page}`,
          {
            method: "POST",
            mode: "cors",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(userInput),
          }
        );
        const response = await requestResponse.json();
        if (!response[0].errors) {
          return response;
        } else {
          return [{ error: response[0].errors[0].message }];
        }
      } catch (error) {
        return [{ error: error.message }];
      }
    },

    /**
     * Gets list of users that are being followed by current user
     * @param {object} userInput user to get information from
     * @param {number} page page to limit number of results
     * @returns
     */
    getFollowing: async (userInput, page) => {
      if (!localStorage.token) {
        return [{ error: "Only Logged in users can do this" }];
      }
      try {
        const requestResponse = await fetch(
          apiUrl + `/follows/display_following?page=${page}`,
          {
            method: "POST",
            mode: "cors",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(userInput),
          }
        );
        const response = await requestResponse.json();
        if (!response[0].errors) {
          return response;
        } else {
          return [{ error: response[0].errors[0].message }];
        }
      } catch (error) {
        return [{ error: error.message }];
      }
    },

    /**
     * Request to add current user as a follower for to target user
     * @param {object} userInput user object with user id to be added
     * @returns
     */
    addFollow: async (userInput) => {
      if (!localStorage.token) {
        return [{ error: "Only Logged in users can do this" }];
      }
      try {
        const requestResponse = await fetch(apiUrl + `/follows/add`, {
          method: "POST",
          mode: "cors",
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
          body: JSON.stringify(userInput),
        });
        const response = await requestResponse.json();
        if (!response[0].errors) {
          return response;
        } else {
          return [{ error: response[0].errors[0].message }];
        }
      } catch (error) {
        return [{ error: error.message }];
      }
    },

    /**
     * Request to remove current user as a follower for to target user
     * @param {object} userInput resource's id to be added
     * @returns
     */
    removeFollow: async (userInput) => {
      if (!localStorage.token) {
        return [{ error: "Only Logged in users can do this" }];
      }
      try {
        const requestResponse = await fetch(apiUrl + `/follows/delete`, {
          method: "POST",
          mode: "cors",
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
          body: JSON.stringify(userInput),
        });
        const response = await requestResponse.json();
        if (!response[0].errors) {
          return response;
        } else {
          return [{ error: response[0].errors[0].message }];
        }
      } catch (error) {
        return [{ error: error.message }];
      }
    },
  },

  games: {
    /**
     * Fetches information about the desired games
     * @param {object} userInput object containing games array
     * @returns Array of games
     */
    displayGames: async (userInput) => {
      try {
        const requestResponse = await fetch(apiUrl + "/games/get_games", {
          method: "POST",
          mode: "cors",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(userInput),
        });
        const response = await requestResponse.json();
        if (!response[0].errors) {
          return response;
        } else {
          return [{ error: response[0].errors[0].message }];
        }
      } catch (error) {
        return [{ error: error.message }];
      }
    },

    /**
     * Get all games in user's list
     * @param {*} userInput
     * @returns Array of objects (games, play count, top1 count)
     */
    get_user_games: async (userInput, page) => {
      try {
        const requestResponse = await fetch(
          apiUrl + "/games/get_user_games?page=" + page,
          {
            method: "POST",
            mode: "cors",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(userInput),
          }
        );
        const response = await requestResponse.json();
        if (response.length == 0) {
          return [{ error: "You've reached the end of this gmology" }];
        } else if (!response[0].errors) {
          return response;
        } else {
          return [{ error: response[0].errors[0].message }];
        }
      } catch (error) {
        return [{ error: error.message }];
      }
    },

    /**
     * Get all top games for user
     * @param {*} userInput
     * @returns Array of objects (games, play count, top1 count)
     */
    getUserTopGames: async (userInput) => {
      try {
        const requestResponse = await fetch(
          apiUrl + "/games/get_user_top_games",
          {
            method: "POST",
            mode: "cors",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(userInput),
          }
        );
        const response = await requestResponse.json();
        if (!response[0].errors) {
          return response;
        } else {
          return [{ error: response[0].errors[0].message }];
        }
      } catch (error) {
        return [{ error: error.message }];
      }
    },
  },

  search: {
    /**
     * Searches databases for users and games and sends back results
     * @param {object} userInput Contains search word
     * @returns Array with object containing games and users arrays
     */
    searchAll: async (userInput) => {
      try {
        const requestResponse = await fetch(apiUrl + "/search/all", {
          method: "POST",
          mode: "cors",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(userInput),
        });
        const response = await requestResponse.json();
        if (!response[0].errors) {
          return response;
        } else {
          return [{ error: response[0].errors[0].message }];
        }
      } catch (error) {
        return [{ error: error.message }];
      }
    },

    /**
     * Request games data and sends back results
     * @param {object} userInput Contains search word
     * @param {number} pageQuery Query string for pagination. Higher number returns more results
     * @returns Arrays of games
     */
    searchGames: async (userInput, pageQuery) => {
      try {
        const requestResponse = await fetch(
          apiUrl + "/search/games" + "?" + "page=" + pageQuery.toString(),
          {
            method: "POST",
            mode: "cors",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(userInput),
          }
        );
        const response = await requestResponse.json();
        if (!response[0].errors) {
          return response;
        } else {
          return [{ error: response[0].errors[0].message }];
        }
      } catch (error) {
        return [{ error: error.message }];
      }
    },
  },

  playedGames: {
    getPlayedGamesCount: async (userInput) => {
      try {
        const requestResponse = await fetch(apiUrl + "/played_games/count", {
          method: "POST",
          mode: "cors",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(userInput),
        });
        const response = await requestResponse.json();
        if (!response[0].errors) {
          return response;
        } else {
          return [{ error: response[0].errors[0].message }];
        }
      } catch (error) {
        return [{ error: error.message }];
      }
    },

    /**
     * Makes request to determine if game has been played by user
     * @param {*} userInput object containing gameid
     * @returns obeject containing attribute with boolean value
     */
    wasPlayed: async (userInput) => {
      if (!localStorage.token) {
        return [{ error: "Only Logged in users can do this" }];
      }
      try {
        const requestResponse = await fetch(
          apiUrl + "/played_games/was_played",
          {
            method: "POST",
            mode: "cors",
            headers: {
              Authorization: "Bearer " + localStorage.getItem("token"),
              "Content-Type": "application/json",
            },
            body: JSON.stringify(userInput),
          }
        );
        const response = await requestResponse.json();
        if (!response[0].errors) {
          return response;
        } else {
          return [{ error: response[0].errors[0].message }];
        }
      } catch (error) {
        return [{ error: error.message }];
      }
    },

    getPlayedGames: async (userInput) => {
      if (!localStorage.token) {
        return [{ error: "Only Logged in users can do this" }];
      }
      try {
        const requestResponse = await fetch(
          apiUrl + "/played_games/display_all",
          {
            method: "POST",
            mode: "cors",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(userInput),
          }
        );
        const response = await requestResponse.json();
        if (!response[0].errors) {
          return response;
        } else {
          return [{ error: response[0].errors[0].message }];
        }
      } catch (error) {
        return [{ error: error.message }];
      }
    },

    addPlayed: async (userInput) => {
      if (!localStorage.token) {
        return [{ error: "Only Logged in users can do this" }];
      }
      try {
        const requestResponse = await fetch(apiUrl + "/played_games/add", {
          method: "POST",
          mode: "cors",
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),
            "Content-Type": "application/json",
          },
          body: JSON.stringify(userInput),
        });
        const response = await requestResponse.json();
        if (!response[0].errors) {
          return response;
        } else {
          return [{ error: response[0].errors[0].message }];
        }
      } catch (error) {
        return [{ error: error.message }];
      }
    },

    removePlayed: async (userInput) => {
      if (!localStorage.token) {
        return [{ error: "Only Logged in users can do this" }];
      }
      try {
        const requestResponse = await fetch(apiUrl + "/played_games/delete", {
          method: "POST",
          mode: "cors",
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),
            "Content-Type": "application/json",
          },
          body: JSON.stringify(userInput),
        });
        const response = await requestResponse.json();
        if (!response[0].errors) {
          return response;
        } else {
          return [{ error: response[0].errors[0].message }];
        }
      } catch (error) {
        return [{ error: error.message }];
      }
    },
  },

  topGames: {
    /**
     *
     * @param {object} userInput resource's id to be added
     * @param {STRING} endPointName main endpoint targeted (top1, top2, top3...)
     * @returns
     */
    addTop: async (userInput, endPointName) => {
      if (!localStorage.token) {
        return [{ error: "Only Logged in users can do this" }];
      }
      try {
        const requestResponse = await fetch(
          apiUrl + `/${endPointName}_games/add`,
          {
            method: "POST",
            mode: "cors",
            headers: {
              Authorization: "Bearer " + localStorage.getItem("token"),
              "Content-Type": "application/json",
            },
            body: JSON.stringify(userInput),
          }
        );
        const response = await requestResponse.json();
        if (!response[0].errors) {
          return response;
        } else {
          return [{ error: response[0].errors[0].message }];
        }
      } catch (error) {
        return [{ error: error.message }];
      }
    },

    /**
     *
     * @param {object} userInput resource's id to be removed
     * @param {STRING} endPointName main endpoint targeted (top1, top2, top3...)
     * @returns
     */
    removeTop: async (userInput, endPointName) => {
      if (!localStorage.token) {
        return [{ error: "Only Logged in users can do this" }];
      }
      try {
        const requestResponse = await fetch(
          apiUrl + `/${endPointName}_games/delete`,
          {
            method: "POST",
            mode: "cors",
            headers: {
              Authorization: "Bearer " + localStorage.getItem("token"),
              "Content-Type": "application/json",
            },
            body: JSON.stringify(userInput),
          }
        );
        const response = await requestResponse.json();
        if (!response[0].errors) {
          return response;
        } else {
          return [{ error: response[0].errors[0].message }];
        }
      } catch (error) {
        return [{ error: error.message }];
      }
    },
  },

  topGamesClaps: {
    /**
     * Requests count of user's top game claps
     * @param {object} userInput resource's id to be added
     * @returns
     */
    displayClaps: async (userInput) => {
      try {
        const requestResponse = await fetch(
          apiUrl + `/top_games_list_claps/display_all`,
          {
            method: "POST",
            mode: "cors",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(userInput),
          }
        );
        const response = await requestResponse.json();
        if (!response[0].errors) {
          return response;
        } else {
          return [{ error: response[0].errors[0].message }];
        }
      } catch (error) {
        return [{ error: error.message }];
      }
    },

    /**
     * Requests to adds clap to user's TopGames  list
     * @param {object} userInput resource's id to be added
     * @returns
     */
    addClap: async (userInput) => {
      try {
        const requestResponse = await fetch(
          apiUrl + `/top_games_list_claps/add`,
          {
            method: "POST",
            mode: "cors",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(userInput),
          }
        );
        const response = await requestResponse.json();
        if (!response[0].errors) {
          return response;
        } else {
          return [{ error: response[0].errors[0].message }];
        }
      } catch (error) {
        return [{ error: error.message }];
      }
    },
  },

  playedGamesLikes: {
    getPlayedGamesLikes: async (userInput) => {
      try {
        const requestResponse = await fetch(
          apiUrl + `/played_games_list_likes/display_all`,
          {
            method: "POST",
            mode: "cors",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(userInput),
          }
        );
        const response = await requestResponse.json();
        if (!response[0].errors) {
          return response;
        } else {
          return [{ error: response[0].errors[0].message }];
        }
      } catch (error) {
        return [{ error: error.message }];
      }
    },

    /**
     * Requests to adds like to user's TopGames  list
     * @param {object} userInput resource's id to be added
     * @returns
     */
    addLike: async (userInput) => {
      if (!localStorage.token) {
        return [{ error: "Only Logged in users can do this" }];
      }
      try {
        const requestResponse = await fetch(
          apiUrl + `/played_games_list_likes/add`,
          {
            method: "POST",
            mode: "cors",
            headers: {
              "Content-Type": "application/json",
              Authorization: "Bearer " + localStorage.getItem("token"),
            },
            body: JSON.stringify(userInput),
          }
        );
        const response = await requestResponse.json();
        if (!response[0].errors) {
          return response;
        } else {
          return [{ error: response[0].errors[0].message }];
        }
      } catch (error) {
        return [{ error: error.message }];
      }
    },

    /**
     * Requests to remove like to user's TopGames  list
     * @param {object} userInput resource's id to be added
     * @returns
     */
    removeLike: async (userInput) => {
      if (!localStorage.token) {
        return [{ error: "Only Logged in users can do this" }];
      }
      try {
        const requestResponse = await fetch(
          apiUrl + `/played_games_list_likes/delete`,
          {
            method: "POST",
            mode: "cors",
            headers: {
              "Content-Type": "application/json",
              Authorization: "Bearer " + localStorage.getItem("token"),
            },
            body: JSON.stringify(userInput),
          }
        );
        const response = await requestResponse.json();
        if (!response[0].errors) {
          return response;
        } else {
          return [{ error: response[0].errors[0].message }];
        }
      } catch (error) {
        return [{ error: error.message }];
      }
    },
  },
};

export default makeRequest;
