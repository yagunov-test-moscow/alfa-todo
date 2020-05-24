<template lang="pug">
 .content-wrapper
    section
      .container
        .task-list__header
          h1.ui-title-1 Задачи
          .button-list
            .button.button--round.button-default(
              @click="filter = 'active'"
            ) Активные
            .button.button--round.button-default(
              @click="filter = 'completed'"
            ) Выполненные
            .button.button--round.button-default(
              @click="filter = 'all'"
            ) Все
        .task-list
          .task-item(
            v-for="task in tasksFilter"
            :key="task.id"
            :class="{ completed: task.completed }"
          )
            .ui-card.ui-card--shadow
              .task-item__info
                span.button-close(
                  @click="deleteTask(task.id)"
                )
              .task-item__content
                .task-item__header
                  .ui-checkbox-wrapper
                    input.ui-checkbox(
                      type='checkbox'
                      v-model="task.completed"
                      @click="taskCompleted(task.id, task.completed)"
                      )
                  span.ui-title-3 {{ task.title }}
                .task-item__body
                  p.ui-text-regular {{ task.description }}
                .task-item__foter
                  .tag-list
                    .ui-tag__wrapper(
                      v-for="tag in task.tags"
                      :key="tag.title"
                    )
                      .ui-tag
                        span.tag-title {{ tag.title }}
                    .button-list
                      .button.button--round.button-default(
                        @click="taskEdit(task.id, task.title, task.description)"
                      ) Изменить

    .ui-messageBox__wrapper(
      v-if="editing"
      :class="{active: editing}"
    )
      .ui-messageBox.fadeInDown
        .ui-messageBox__header
          span.messageBox-title {{ titleEditing }}
          span.button-close(@click="cancelTaskEdit")
        .ui-messageBox__content
          p Заголовок
          input(
            type="text"
            v-model='titleEditing'
          )
          p Описание
          textarea(
            type="text"
            v-model='desrEditing'
          )
        .ui-messageBox__footer
          .button.button-light(@click="cancelTaskEdit") Cansel
          .button.button-primary(@click="finishTaskEdit") OK

</template>

<script>
export default {
  data () {
    return {
      filter: 'all',
      editing: false,
      titleEditing: '',
      desrEditing: '',
      taskId: null
    }
  },
  methods: {
    taskCompleted (id, completed) {
      completed ? completed = false : completed = true
      this.$store.dispatch('completedTask', {
        id,
        completed
      })
        .then(() => {
          console.log(completed)
          this.$store.dispatch('loadTasks')
        })
    },
    taskEdit (id, title, description) {
      this.editing = !this.editing
      this.taskId = id
      this.titleEditing = title
      this.desrEditing = description
    },
    cancelTaskEdit () {
      this.editing = !this.editing
      this.taskId = null
      this.titleEditing = ''
      this.desrEditing = ''
    },
    finishTaskEdit () {
      this.$store.dispatch('editTask', {
        id: this.taskId,
        title: this.titleEditing,
        description: this.desrEditing
      })
      this.editing = !this.editing
    },
    deleteTask (id) {
      this.$store.dispatch('deleteTask', id)
        .then(() => {
          console.log('task deleted')
          this.$store.dispatch('loadTasks')
        })
    }
  },
  computed: {
    tasksFilter () {
      if (this.filter === 'active') {
        return this.$store.getters.taskNotCompleted
      } else if (this.filter === 'completed') {
        return this.$store.getters.taskCompleted
      } else if (this.filter === 'all') {
        return this.$store.getters.tasks
      }
      return this.filter === 'active'
    }
  }
}
</script>

<style lang="stylus" scoped>

.task-list__header
  display flex
  justify-content space-between
  align-items center
  margin-bottom 30px
  .button
    margin-right 8px
  .ui-title-1
    margin-bottom 0

.task-item
  margin-bottom 20px
  .ui-checkbox:checked:before
    border-color #909399
  &.completed
    .ui-title-3,
    .ui-text-regular,
    .ui-tag
      text-decoration line-through
      color #909399
  &:last-child
    margin-bottom 0

.ui-label
  margin-right 8px

.task-item__info
  display flex
  align-items center
  justify-content space-between
  margin-bottom 20px
  .button-close
    margin right
    width 20px
    height @width

.task-item__header
  display flex
  align-items center
  margin-bottom 18px
  .ui-checkbox-wrapper
    margin-right 8px
  .ui-title-3
    margin-bottom 6px

.task-item__body
  margin-bottom 20px

.tag-list
  margin-bottom 20px

.task-item__foter
  .button-list
    text-align right

.button-list
  .button
    margin-right 12px
    &:last-child
      margin-right 0

.ui-messageBox__wrapper
  &.active
    display flex
  .button-light
    margin-right 8px

h1
  color rgb(0,120,215)

</style>
