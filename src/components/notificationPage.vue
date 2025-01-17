<template>
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
          </div>

          <!-- Single Modal -->
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
                    {{ selectedNotification?.title }}
                  </h5>
                  <button
                    type="button"
                    class="btn-close text-white"
                    data-bs-dismiss="modal"
                    aria-label="Close"
                  />
                </div>
                <div class="modal-body">
                  <div v-html="selectedNotification?.message" />
                </div>
              </div>
            </div>
          </div>

          <div
            v-if="count === 0"
            class="mt-5 text-center"
          >
            <span>
              <i class="bi bi-envelope-fill me-4 fs-4" />
              <span class="fs-4 text-truncate">No Notification</span>
            </span>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import axios from 'axios';
export default {
  name: 'NotificationPage',
  data() {
    return {
      notifications: [],
      selectedNotification: null,
      count: 0
    };
  },
  mounted() {
    this.fetchNotification();
  },
  methods: {
    async fetchNotification() {
      try {
        const response = await axios.get('/notification?pageSize=0');
        this.notifications = response.data.notifications;
        this.count = response.data.count;
      } catch (e) {
        console.error(e);
      }
    },
    async viewNotification(notification) {
      try {
        this.selectedNotification = notification; // Set the selected notification
        if (notification.status !== 'viewed') {
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
/* Add any additional styles here */
</style>
