var Movie = Backbone.Model.extend({

  defaults: {
    like: true
  },

  toggleLike: function() {
    // your code here
    var like = !this.get('like');
    this.set('like', like);
  }

});

var Movies = Backbone.Collection.extend({

  model: Movie,

  initialize: function() {
    // your code here
    this.on('change:like', this.sort, this)
  },

  comparator: 'title',

  sortByField: function(field) {
    // your code here
    //this.set('comparator', field);
    this.comparator = field;
    console.log('sort');
    this.sort();
  }
});

var AppView = Backbone.View.extend({

  events: {
    'click form input': 'handleClick'
  },

  handleClick: function(e) {
    var field = $(e.target).val();
    //console.log('field',field);
    this.collection.sortByField(field);
    this.render();
  },

  render: function() {
    console.log("render");
    new MoviesView({
      el: this.$('#movies'),
      collection: this.collection
    }).render();
  }

});

var MovieView = Backbone.View.extend({

  template: _.template('<div class="movie"> \
                          <div class="like"> \
                            <button><img src="images/<%- like ? \'up\' : \'down\' %>.jpg"></button> \
                          </div> \
                          <span class="title"><%- title %></span> \
                          <span class="year">(<%- year %>)</span> \
                          <div class="rating">Fan rating: <%- rating %> of 10</div> \
                        </div>'),

  initialize: function() {
    // your code here
    this.model.on('change:like', this.render, this)
  },

  events: {
    'click button': 'handleClick'
  },

  handleClick: function(e) {
    // your code here
  //  console.log(this)
    this.model.toggleLike();

    //this.render();
  //   var  = $(e.target).val();
  //   console.log('field',field);
  //   this.collection.sortByField(field);
  //   this.render();
  },

  render: function() {
    this.$el.html(this.template(this.model.attributes));
    return this.$el;
  }

});

var MoviesView = Backbone.View.extend({

  initialize: function() {
    // your code here
    this.collection.on('sort', this.render, this)
  },

  render: function() {
    this.$el.empty();
    this.collection.forEach(this.renderMovie, this);
  },

  renderMovie: function(movie) {
    var movieView = new MovieView({model: movie});
    this.$el.append(movieView.render());
  }

});
