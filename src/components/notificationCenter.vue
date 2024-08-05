<template>
  <div>
    <section class="py-3 d-flex justify-content-center align-items-center">
      <div class="container">
        <div class="row">
          <div class="col-12 bg-white shadow rounded pb-5">
            <h3 class="h2 mb-2 my-4 text-center">
              System Notifications
            </h3>
            <form
              class="w-50 mx-auto"
              @submit.prevent="submitForm"
            >
              <div class="mb-3">
                <label
                  for="status"
                  class="form-label fw-bold"
                >Users :</label>
                <select
                  id="status"
                  v-model="formData.users"
                  class="form-select mb-4"
                >
                  <option
                    value=""
                    selected
                  >
                    All
                  </option>
                  <option value="admin">
                    Admins
                  </option>
                  <option value="candidate">
                    Candidates
                  </option>
                </select>
              </div>
              <div class="mb-3">
                <label
                  for="title"
                  class="form-label fw-bold"
                >Title :</label>
                <input
                  id="title"
                  v-model="formData.title"
                  type="text"
                  class="form-control mb-4"
                  required
                >
              </div>
              <div class="mb-3">
                <label
                  for="message"
                  class="form-label fw-bold"
                >Message : (CLASSIC / HTML)</label>
                <textarea
                  id="message"
                  v-model="formData.message"
                  class="form-control"
                  rows="5"
                  required
                />
              </div>

              <button
                type="submit"
                class="btn btn-primary mt-3"
              >
                Submit
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
    <section class="py-3 d-flex justify-content-center align-items-center">
      <div class="container">
        <div class="row">
          <div class="col-12 bg-white shadow rounded pb-5">
            <h3 class="h2 mb-2 my-4 text-center">
              Notifications
            </h3>
            <div
              v-for="notification in notifications"
              :key="notification.id"
            >
              <div
                class="m-4 bg-white shadow rounded d-flex" 
                data-bs-toggle="modal" 
                data-bs-target="#notificationModal"
                style="cursor: pointer;"
                @click="viewNotification(notification)"
              >
                <p
                  class="mb-3 p-3"
                  :class="notification.status === 'notviewed' ? 'fw-bold' : ''"
                >
                  {{ notification?.title }}
                </p>
                <i
                  class="bi fs-5 ms-auto my-auto me-3"
                  :class="notification.status === 'notviewed' ? 'bi-eye-slash' : 'bi-eye-fill text-success'"
                />
              </div>
              <!-- Modal -->
              <div
                id="notificationModal"
                class="modal fade"
                tabindex="-1"
                aria-labelledby="notificationModalLabel"
                aria-hidden="true"
              >
                <div class="modal-dialog modal-dialog-centered">
                  <div class="modal-content">
                    <div class="modal-header">
                      <h5
                        id="notificationModalLabel"
                        class="modal-title"
                      >
                        {{ notification?.title }}
                      </h5>
                      <button
                        type="button"
                        class="btn-close text-white"
                        data-bs-dismiss="modal"
                        aria-label="Close"
                      />
                    </div>
                    <div class="modal-body">
                      <div v-html="notification?.message" />
                      <!-- Add more details if needed -->
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div
              v-if="count===0"
              class="mt-5 text-center"
            >
              <span>
                <i class="bi bi-envelope-fill me-4 fs-4 " />
                <span class="fs-4 text-truncate">No Notification</span>
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>
  
  <script>
  import axios from 'axios';
  export default {
    name: 'NotificationCenter',
    data() {
      return {
        notifications: [],
        selectedNotification: null,
        count: 0,
        formData: {
        title: '',
        message: '',
        users:''
      },
      };
    },
    mounted() {
      this.fetchNotification();
    },
    methods: {
        async submitForm() {
          try {
            await axios.post('/adminNotification', this.formData);
            this.formData = {
              title: '',
              message: '',
              users:''
            };
            this.fetchNotification();
          } catch (e) {
            console.error(e);
          }
        },
      async fetchNotification() {
        try {
          const response = await axios.get('/notification?pageSize=0');
          this.notifications = response.data.notifications;
          this.count = response.data.count; 
        } catch (e) {
          console.error(e);
        }
      },
      async viewNotification(notification){
        try {
            if(notification.status !=='viewed'){
           await axios.put(`/notification/${notification._id}`, {
            status: 'viewed'
          });
          notification.status = 'viewed'; // Update local status
        }
        } catch (e) {
          console.error(e);
        }
      }
    }
  };
  </script>
  
  <style>
    .form-control:focus,
    .form-select:focus,
    .form-check-input:focus {
        box-shadow: none;
    }
  </style>
  