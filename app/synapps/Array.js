"use strict";

/**
 * Clears an array.
 *
 * This method extends the Array prototype, to provide additional functionalities with Arrays.
 */
Array.prototype.clear = function() {
    while (this.length > 0) {
        this.pop();
    }
};
