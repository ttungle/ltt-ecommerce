'use strict';

/**
 * product-review service
 */

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::product-review.product-review');
