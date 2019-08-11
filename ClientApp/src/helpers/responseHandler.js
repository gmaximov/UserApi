import { logoutHandler } from './logoutHandler';

export function responseHandler(response) {
    console.log(response);
    return response.text().then(text => {
        var data = (function (raw) {
            try {
                return JSON.parse(raw);
            } catch (err) {
                return {};
            }
        })(text);

        console.log(data);
        if (!response.ok) {
            if (response.status === 401 && !data.message) {
                // auto logout if 401 response returned from api
                logoutHandler();
                window.location.reload(true);
            }
            if (response.status === 400 && !data.message) {
                data.message = "Invalid login or password";
            }
            if (response.status === 403 && !data.message) {
                data.message = "Forbidden";
            }
            const error = (data && data.message) || response.statusText;
            return Promise.reject(error);
        }
        return data;
    });
}