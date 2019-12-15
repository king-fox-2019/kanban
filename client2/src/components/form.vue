<template>
  <div>
    <b-form @submit="onSubmit">
      <!-- title -->
      <b-form-group
        id="input-group-1"
        label="Title:"
        label-for="input-1"
      >
        <b-form-input
          id="input-1"
          v-model="form.title"
          type="text"
          required
          placeholder="Task Title"
        ></b-form-input>
      </b-form-group>

      <!-- description -->
      <b-form-group id="input-group-2" label="Description:" label-for="input-2">
        <b-form-textarea
          id="input-2"
          type="text"
          v-model="form.description"
          required
          placeholder="Task Short Description"
        ></b-form-textarea>
      </b-form-group>

      <b-form-group id="input-group-3" label="Assigned To:" label-for="input-3">
        <b-form-select
          id="input-3"
          v-model="form.assignedTo"
          :options="budy"
          required
        ></b-form-select>
      </b-form-group>

      <b-button type="submit" variant="primary">Submit</b-button>
    </b-form>
  </div>
</template>

<script>
export default {
  data () {
    return {
      form: {
        title: '',
        description: '',
        assignedTo: null,
        status: 'back-log'
      },
      budy: [{ text: 'Select One', value: null }, 'Ruby', 'Hardim', 'fiqi', 'dimitri']
    }
  },
  methods: {
    onSubmit (evt) {
      console.log('masuk')
      this.$db.collection('task').add(this.form)
      this.$emit('hideModal')
      }
    }
  }
</script>
