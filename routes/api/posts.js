var async = require('async'),
  keystone = require('keystone');

var Post = keystone.list('Post'),
    PostCategory = keystone.list('PostCategory')
  ;

/**
 * List Posts
 */
exports.list = function (req, res) {
  Post.model.find().populate('categories').exec(function (err, items) {

    if (err) return res.apiError('database error', err);

    // res.apiResponse({
    //   posts: items
    // });

    res.apiResponse(items);

  });
};

/**
 * Get Post by ID
 */
exports.get = function (req, res) {
  Post.model.findOne().populate('categories').where('slug', req.params.slug).exec(function (err, item) {
    item.visits += 1;
    item.save();
    if (err) return res.apiError('database error', err);
    if (!item) return res.apiError('not found');

    res.apiResponse(
      item
    );

  });
};


/**
 * Create a Post
 */
exports.create = function (req, res) {

  var item = new Post.model(),
    data = (req.method == 'POST') ? req.body : req.query;

  item.getUpdateHandler(req).process(data, function (err) {

    if (err) return res.apiError('error', err);

    res.apiResponse({
      post: item
    });

  });
};

/**
 * Get Post by ID
 */
exports.update = function (req, res) {
  Post.model.findById(req.params.id).exec(function (err, item) {

    if (err) return res.apiError('database error', err);
    if (!item) return res.apiError('not found');

    var data = (req.method == 'POST') ? req.body : req.query;

    item.getUpdateHandler(req).process(data, function (err) {

      if (err) return res.apiError('create error', err);

      res.apiResponse({
        post: item
      });

    });

  });
};

/**
 * Delete Post by ID
 */
exports.remove = function (req, res) {
  Post.model.findById(req.params.id).exec(function (err, item) {

    if (err) return res.apiError('database error', err);
    if (!item) return res.apiError('not found');

    item.remove(function (err) {
      if (err) return res.apiError('database error', err);

      return res.apiResponse({
        success: true
      });
    });

  });
};

/**
 * List Posts
 */
exports.all = function (req, res) {
  var skip = req.query.skip || 0,
    limit = req.query.limit || 0,
    categoryKey = req.query.categoryKey || "",
    querySet = Post.model.find({state: 'published'}).populate('categories').sort({publishedDate: 'desc'})
    ;

  if (categoryKey) {
    PostCategory.model.findOne().where('key', categoryKey).exec(function (err, category) {
      if (category) {
        querySet.where('categories').in([category.id]);
      }
      finishQuerySet();
    });
  } else {
    finishQuerySet();
  }

  function finishQuerySet() {
    querySet
      .skip(skip)
      .limit(limit)
      .exec(function (err, items) {
        if (err) return res.apiError('database error', err);
        res.apiResponse(items);

      });
  }

};
