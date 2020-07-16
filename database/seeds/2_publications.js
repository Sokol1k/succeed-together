const faker = require("faker");

exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('publications').del()
    .then(function () {
      // Inserts seed entries
      return knex('publications').insert([
        {
          user_id: 1,
          title: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Accusantium soluta sapiente ex error id beatae non vel impedit nulla ipsum!",
          description: "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Neque eligendi consectetur aperiam, nesciunt quas laudantium aut sed officiis asperiores dolorem voluptatem voluptates quisquam modi illo possimus. Reprehenderit adipisci magnam totam modi officia et, qui facilis dolorum assumenda? Nesciunt eius dolor minima, aliquid soluta quibusdam alias itaque? Autem cupiditate, officiis delectus minima nam aliquid provident totam hic aliquam. Dicta ipsam, totam eligendi veritatis aperiam reprehenderit libero perferendis labore aspernatur laborum itaque dolor? Ullam veniam tempore nisi quisquam in, pariatur minima deserunt repellat iste dignissimos, tempora placeat quidem id quo deleniti quaerat debitis sunt numquam aut culpa ipsum dicta autem? Excepturi, reprehenderit."
        },
        {
          user_id: 2,
          title: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Accusantium soluta sapiente ex error id beatae non vel impedit nulla ipsum!",
          description: "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Neque eligendi consectetur aperiam, nesciunt quas laudantium aut sed officiis asperiores dolorem voluptatem voluptates quisquam modi illo possimus. Reprehenderit adipisci magnam totam modi officia et, qui facilis dolorum assumenda? Nesciunt eius dolor minima, aliquid soluta quibusdam alias itaque? Autem cupiditate, officiis delectus minima nam aliquid provident totam hic aliquam. Dicta ipsam, totam eligendi veritatis aperiam reprehenderit libero perferendis labore aspernatur laborum itaque dolor? Ullam veniam tempore nisi quisquam in, pariatur minima deserunt repellat iste dignissimos, tempora placeat quidem id quo deleniti quaerat debitis sunt numquam aut culpa ipsum dicta autem? Excepturi, reprehenderit."
        },
        {
          user_id: 3,
          title: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Accusantium soluta sapiente ex error id beatae non vel impedit nulla ipsum!",
          description: "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Neque eligendi consectetur aperiam, nesciunt quas laudantium aut sed officiis asperiores dolorem voluptatem voluptates quisquam modi illo possimus. Reprehenderit adipisci magnam totam modi officia et, qui facilis dolorum assumenda? Nesciunt eius dolor minima, aliquid soluta quibusdam alias itaque? Autem cupiditate, officiis delectus minima nam aliquid provident totam hic aliquam. Dicta ipsam, totam eligendi veritatis aperiam reprehenderit libero perferendis labore aspernatur laborum itaque dolor? Ullam veniam tempore nisi quisquam in, pariatur minima deserunt repellat iste dignissimos, tempora placeat quidem id quo deleniti quaerat debitis sunt numquam aut culpa ipsum dicta autem? Excepturi, reprehenderit."
        },
        {
          user_id: 1,
          title: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Accusantium soluta sapiente ex error id beatae non vel impedit nulla ipsum!",
          description: "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Neque eligendi consectetur aperiam, nesciunt quas laudantium aut sed officiis asperiores dolorem voluptatem voluptates quisquam modi illo possimus. Reprehenderit adipisci magnam totam modi officia et, qui facilis dolorum assumenda? Nesciunt eius dolor minima, aliquid soluta quibusdam alias itaque? Autem cupiditate, officiis delectus minima nam aliquid provident totam hic aliquam. Dicta ipsam, totam eligendi veritatis aperiam reprehenderit libero perferendis labore aspernatur laborum itaque dolor? Ullam veniam tempore nisi quisquam in, pariatur minima deserunt repellat iste dignissimos, tempora placeat quidem id quo deleniti quaerat debitis sunt numquam aut culpa ipsum dicta autem? Excepturi, reprehenderit."
        }
      ]);
    });
};
