<template>
  <section class="container">
    <div class="tile is-ancestor">
      <div class="tile is-vertical">
        <div
          class="tile is-parent"
          v-for="item in arrangedKanban[0]"
          :key="item.id"
        >
          <article class="tile is-child notification is-info">
            <div class="media">
              <div class="media-left">
                <figure class="image is-48x48">
                  <img
                    src="https://bulma.io/images/placeholders/96x96.png"
                    alt="Placeholder image"
                  />
                </figure>
              </div>
              <div class="media-content">
                <p class="title is-4">{{ item.data.title }}</p>
                <p class="subtitle is-6">@johnsmith</p>
              </div>
            </div>
            <div class="content">
              {{ item.data.desc }} <a>@bulmaio</a>.
              <a href="#">#css</a>
              <a href="#">#responsive</a>
              <br />
              <time datetime="2016-1-1">11:09 PM - 1 Jan 2016</time>
            </div>
          </article>
        </div>
      </div>
      <div class="tile is-vertical">
        <div
          class="tile is-parent"
          v-for="item in arrangedKanban[1]"
          :key="item.id"
        >
          <article class="tile is-child notification is-info">
            <div class="media">
              <div class="media-left">
                <figure class="image is-48x48">
                  <img
                    src="https://bulma.io/images/placeholders/96x96.png"
                    alt="Placeholder image"
                  />
                </figure>
              </div>
              <div class="media-content">
                <p class="title is-4">{{ item.data.title }}</p>
                <p class="subtitle is-6">@johnsmith</p>
              </div>
            </div>
            <div class="content">
              {{ item.data.desc }} <a>@bulmaio</a>.
              <a href="#">#css</a>
              <a href="#">#responsive</a>
              <br />
              <time datetime="2016-1-1">11:09 PM - 1 Jan 2016</time>
            </div>
          </article>
        </div>
      </div>
      <div class="tile is-vertical">
        <div
          class="tile is-parent"
          v-for="item in arrangedKanban[2]"
          :key="item.id"
        >
          <article class="tile is-child notification is-info">
            <div class="media">
              <div class="media-left">
                <figure class="image is-48x48">
                  <img
                    src="https://bulma.io/images/placeholders/96x96.png"
                    alt="Placeholder image"
                  />
                </figure>
              </div>
              <div class="media-content">
                <p class="title is-4">{{ item.data.title }}</p>
                <p class="subtitle is-6">@johnsmith</p>
              </div>
            </div>
            <div class="content">
              {{ item.data.desc }} <a>@bulmaio</a>.
              <a href="#">#css</a>
              <a href="#">#responsive</a>
              <br />
              <time datetime="2016-1-1">11:09 PM - 1 Jan 2016</time>
            </div>
          </article>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import db from '../../config/firebaseconfig'

export default {
  data() {
    return {
      kanban_items: {
        backlog: [],
        todo: [],
        doing: [],
        done: []
      }
    }
  },
  computed: {
    tab() {
      return this.$store.state.kanban_tab
    },
    arrangedKanban() {
      const arranger = [[], [], []]
      const docRefs = this.kanban_items[this.tab]
      for (let i = 0; i < docRefs.length; i += 3) {
        arranger[0].push({ id: docRefs[i].id, data: docRefs[i].data() })
        if (docRefs[i + 1])
          arranger[1].push({
            id: docRefs[i + 1].id,
            data: docRefs[i + 1].data()
          })
        if (docRefs[i + 2])
          arranger[2].push({
            id: docRefs[i + 2].id,
            data: docRefs[i + 2].data()
          })
      }
      return arranger
    }
  },
  watch: {
    // $route(to, from) {}
  },
  beforeCreate() {
    this.$store.dispatch('getKanbanName', this.$route.params.id)
  },
  created() {
    db.collection('kanbans')
      .doc(this.$route.params.id)
      .collection('kanban_backlog')
      .onSnapshot(kanbanSnapshot => {
        this.kanban_items.backlog = kanbanSnapshot.empty
          ? []
          : kanbanSnapshot.docs
      })
    db.collection('kanbans')
      .doc(this.$route.params.id)
      .collection('kanban_todo')
      .onSnapshot(kanbanSnapshot => {
        this.kanban_items.todo = kanbanSnapshot.empty ? [] : kanbanSnapshot.docs
      })
    db.collection('kanbans')
      .doc(this.$route.params.id)
      .collection('kanban_doing')
      .onSnapshot(kanbanSnapshot => {
        this.kanban_items.doing = kanbanSnapshot.empty
          ? []
          : kanbanSnapshot.docs
      })
    db.collection('kanbans')
      .doc(this.$route.params.id)
      .collection('kanban_done')
      .onSnapshot(kanbanSnapshot => {
        this.kanban_items.done = kanbanSnapshot.empty ? [] : kanbanSnapshot.docs
      })
  }
}
</script>

<style></style>
