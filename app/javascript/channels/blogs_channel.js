import consumer from "./consumer";

((() => {
  jQuery(document).on("turbolinks:load", () => {
    let comments;
    comments = $("#comments");
    if (comments.length > 0) {
      consumer.global_chat = consumer.subscriptions.create(
        {
          channel: "BlogsChannel",
          blog_id: comments.data("blog-id")
        },
        {
          connected() {
            console.log("We are connected");

            // Called when the subscription is ready for use on the server
          },

          disconnected() {
            // Called when the subscription has been terminated by the server
          },

          received(data) {
            return comments.append(data["comment"]);
            // Called when there's incoming data on the websocket for this channel
          },
          send_comment(comment, blog_id) {
            return this.perform("send_comment", {
              comment,
              blog_id
            });
          }
        }
      );

      return $("#new_comment").submit(function(e) {
        let $this;
        let textarea;
        $this = $(this);
        textarea = $this.find("#comment_content");
        if ($.trim(textarea.val()).length > 1) {
          consumer.global_chat.send_comment(textarea.val(), comments.data("blog-id"));
          textarea.val("");
        }
        e.preventDefault();
        return false;
      });
    });
  }).call(this));
