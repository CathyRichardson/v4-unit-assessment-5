module.exports = {
  readPosts: async (req, res) => {
    let { id } = req.session.user;
    let { mine, search, oldest } = req.query;
    const db = await req.app.get('db')
    if (mine && !search) {
      if (oldest) {
        db.post.read_all_oldest_first()
          .then(posts => res.status(200).send(posts))
      } else {
        db.post.read_all_posts()
          .then(posts => res.status(200).send(posts))
      }
    } else if (!mine && search) {
      if (oldest) {
        db.search.search_other_oldest_first([`%${search.toLowerCase()}%`, id])
          .then(posts => res.status(200).send(posts))
      } else {
        db.search.search_other_users_posts([`%${search.toLowerCase()}%`, id])
          .then(posts => res.status(200).send(posts))
      }
    } else if (mine && search) {
      if (oldest) {
        db.search.search_all_oldest_first([`%${search.toLowerCase()}%`])
          .then(posts => res.status(200).send(posts))
      } else {
        db.search.search_all_posts([`%${search.toLowerCase()}%`])
          .then(posts => res.status(200).send(posts))
      }
    } else {
      if (oldest) {
        db.post.read_other_oldest_first([id])
          .then(posts => res.status(200).send(posts))
      } else {
        db.post.read_other_users_posts([id])
          .then(posts => res.status(200).send(posts))
      }
    }
  },
  createPost: (req, res) => {
    //code here
    db = req.app.get('db');
    const { user } = req.session;
    const { title, img, content } = req.body;
    const date = new Date; // This uses the built in JavaScript Date object to get the current date and time and converts them to a format that our database can read
    if (user && user.id) {
      console.log(user)
      db.post.create_post(user.id, title, img, content, date)
        .then(() => res.sendStatus(200));
    } else {
      res.sendStatus(403);
    }
  },
  readPost: (req, res) => {
    req.app.get('db').post.read_post(req.params.id)
      .then(post => post[0] ? res.status(200).send(post[0]) : res.status(200).send({}))
  },
  deletePost: (req, res) => {
    req.app.get('db').post.delete_post(req.params.id)
      .then(_ => res.sendStatus(200))
  }
}