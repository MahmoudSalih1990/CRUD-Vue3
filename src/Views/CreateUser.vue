<template>
    <div class="create-user">
        <h1>Add New User</h1>
        <form @submit.prevent="addUser" v-if="!userCreated">
            <div class="step step1" v-if="step === 1">
                <h3><i class="fas fa-user"></i> Personal Details</h3>
                <label>
                    <i class="fas fa-user"></i>
                    <input v-model.lazy="newUser.name" placeholder="Name" required />
                </label>
                <span v-if="v$.name.$error">{{ getErrorMessage('name') }} </span>

                <label>
                    <i class="fas fa-user-tag"></i>
                    <input v-model="newUser.username" placeholder="Username" required />
                </label>
                <span v-if="v$.username.$error">{{ getErrorMessage('username') }}</span>

                <label>
                    <i class="fas fa-envelope"></i>
                    <input v-model="newUser.email" type="email" placeholder="Email" required />
                </label>
                <span v-if="v$.email.$error">{{ getErrorMessage('email') }}</span>

                <label>
                    <i class="fas fa-phone"></i>
                    <input v-model="newUser.phone" placeholder="Phone" required />
                </label>
                <span v-if="v$.phone.$error">{{ getErrorMessage('phone') }}</span>
                <button type="button" @click="step++">
                    Next<i class="fas fa-arrow-right"></i>
                </button>
            </div>
            <div class="step step2" v-else-if="step === 2">
                <h3><i class="fas fa-address-card"></i> Address</h3>
                <label>
                    <i class="fas fa-road"></i>
                    <input v-model="newUser.address.street" placeholder="Street" required />
                </label>
                <span v-if="v$.address.street.$error">{{
                    getErrorMessage('address.street')
                }}</span>
                <label>
                    <i class="fas fa-door-open"></i>
                    <input v-model="newUser.address.suite" placeholder="Suite" required />
                </label>
                <span v-if="v$.address.suite.$error">{{
                    getErrorMessage('address.suite')
                }}</span>
                <label>
                    <i class="fas fa-city"></i>
                    <input v-model="newUser.address.city" placeholder="City" required />
                </label>
                <span v-if="v$.address.city.$error">{{
                    getErrorMessage('address.city')
                }}</span>
                <label>
                    <i class="fas fa-map-pin"></i>
                    <input v-model="newUser.address.zipcode" placeholder="Zipcode" required />
                </label>
                <span v-if="v$.address.zipcode.$error">{{
                    getErrorMessage('address.zipcode')
                }}</span>
                <h3 class="GeoButtin" @click="openModal"><i class="fas fa-globe-americas"></i> use the map</h3>
                <div class="cord">
                    <label>
                        <i class="fas fa-map-marker-alt"></i>
                        <input v-model="newUser.address.geo.lat" placeholder="Lat" required />
                    </label>
                    <span v-if="v$.address.geo.lat.$error">{{

                        getErrorMessage('address.geo.lat')
                    }}</span>

                    <label>
                        <i class="fas fa-map-marker-alt"></i>
                        <input v-model="newUser.address.geo.lng" placeholder="Lng" required />
                    </label>
                    <span v-if="v$.address.geo.lng.$error">{{
                        getErrorMessage('address.geo.lng')
                    }}</span>

                </div>

                <button type="button" @click="step--">
                    <i class="fas fa-arrow-left"></i> Previous
                </button>
                <button type="button" @click="step++">
                    Next <i class="fas fa-arrow-right"></i>
                </button>
            </div>

            <div class="step step3" v-else-if="step === 3">
                <h3><i class="fas fa-info-circle"></i> Website and Company Details</h3>
                <label>
                    <i class="fas fa-globe"></i>
                    <input v-model="newUser.website" type="text" placeholder="Website" />
                </label>
                <span v-if="v$.website.$error">{{ getErrorMessage('website') }}</span>

                <label>
                    <i class="fas fa-building"></i>
                    <input v-model="newUser.company.name" type="text" placeholder="Company Name" />
                </label>
                <span v-if="v$.company.name.$error">{{
                    getErrorMessage('company.name')
                }}</span>
                <label>
                    <i class="fas fa-bullhorn"></i>
                    <input v-model="newUser.company.catchPhrase" type="text" placeholder="Catch Phrase" />
                </label>
                <span v-if="v$.company.catchPhrase.$error">{{
                    getErrorMessage('company.catchPhrase')
                }}</span>
                <label>
                    <i class="fas fa-chart-line"></i>
                    <input v-model="newUser.company.bs" type="text" placeholder="Business Strategy" />
                </label>
                <span v-if="v$.company.bs.$error">{{ getErrorMessage('company.bs') }}</span>

                <button type="button" @click="step--">
                    <i class="fas fa-arrow-left"></i> Previous
                </button>
                <button type="submit"><i class="fas fa-user-plus"></i> Add User</button>
            </div>
        </form>

        <div v-if="showMapModal" class="modal">
            <div style="height:50vh; width:50vw">
                <l-map ref="map" v-model:zoom="zoom" :center="[47.41322, -1.219482]" @click="updateLatLng">
                    <l-tile-layer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" layer-type="base"
                        name="OpenStreetMap"></l-tile-layer>
                    <l-marker v-if="marker" :lat-lng="marker"></l-marker>
                </l-map>
                <button @click="hideMap()">
                    Back
                </button>
            </div>
        </div>


        <div class="step" v-if="userCreated">
            <p>created successfully</p>
            <div class="user-detail-panel">
                <h2><span class="material-icons">person</span> {{ newUser.name }}</h2>
                <p><span class="material-icons">account_circle</span> <strong>newUsername:</strong> {{ newUser.username }}
                </p>
                <p><span class="material-icons">email</span> <strong>Email:</strong> {{ newUser.email }}</p>
                <p><span class="material-icons">home</span> <strong>Address:</strong> {{ newUser.address.street }}, {{
                    newUser.address.city }}</p>
                <p><span class="material-icons">phone</span> <strong>Phone:</strong> {{ newUser.phone }}</p>
                <p><span class="material-icons">public</span> <strong>Website:</strong> {{ newUser.website }}</p>
                <p><span class="material-icons">business</span> <strong>Company:</strong> {{ newUser.company.name }}</p>
            </div>
            <button @click="goBack">Yes</button>
        </div>
    </div>
</template>

<script>
import { ref, onMounted } from "vue";
import { useStore } from "vuex";
import { useVuelidate } from "@vuelidate/core";
import { rules, messages } from '../helpers/validationRules.js';
import "leaflet/dist/leaflet.css";
import { LMap, LTileLayer, LMarker } from "@vue-leaflet/vue-leaflet";
export default {
    components: {
        LMap,
        LTileLayer,
    },
    setup() {
        const store = useStore();
        const userCreated = ref(false);

        const step = ref(1);
        const showMapModal = ref(false);
        const zoom = ref(2);
        const marker = ref(null);
        const newUser = ref({
            name: "",
            username: "",
            email: "",
            phone: "",
            address: {
                street: "",
                suite: "",
                city: "",
                zipcode: "",
                geo: {
                    lat: "",
                    lng: "",
                },
            },
            website: "",
            company: {
                name: "",
                catchPhrase: "",
                bs: "",
            },
        });

        const v$ = useVuelidate(rules, newUser, { messages });

        const getErrorMessage = (fieldPath) => {
            const fieldNames = fieldPath.split('.');
            let fieldRules = rules;
            let fieldMessages = messages;
            let fieldState = v$.value;

            for (const fieldName of fieldNames) {
                fieldRules = fieldRules[fieldName];
                fieldMessages = fieldMessages[fieldName];
                fieldState = fieldState[fieldName];
            }
            let errorMessage = '';
            for (const rule in fieldRules) {
                if (fieldState[rule].$invalid) {

                    errorMessage = fieldMessages[rule];
                }
            }

            return errorMessage;
        }

        const updateLatLng = (event) => {
            newUser.value.address.geo.lat = event.latlng.lat.toString();
            newUser.value.address.geo.lng = event.latlng.lng.toString();
            marker.value = [event.latlng.lat, event.latlng.lng];
        };
        const addUser = async () => {
            await v$.value.$touch();
            if (!v$.value.$error) {

                await store.dispatch("addUser", newUser.value);
                userCreated.value = true;


            }
            step.value = 1;
        };
        const openModal = () => {
            showMapModal.value = true;

        }
        const hideMap = () => {
            showMapModal.value = false;

        }

        const goBack = () => {
            userCreated.value = false;
            newUser.value = {
                name: "",
                username: "",
                email: "",
                phone: "",
                address: {
                    street: "",
                    suite: "",
                    city: "",
                    zipcode: "",
                    geo: {
                        lat: "",
                        lng: "",
                    },
                },
                website: "",
                company: {
                    name: "",
                    catchPhrase: "",
                    bs: "",
                },
            };
        }
        return { newUser, addUser, step, v$, getErrorMessage, userCreated, goBack, showMapModal, zoom, openModal, hideMap, updateLatLng, marker };
    }
};
</script>

<style scoped>
@import '../style.css';

.create-user {
    box-shadow: 0 4px 8px 0 var(--shadow-color), 0 6px 20px 0 var(--shadow-color);
    overflow-y: auto;
    width: 80%;
    max-width: 600px;
}

.create-user h1,
.create-user h3,
.create-user label {
    text-shadow: 2px 2px 4px var(--text-shadow-color);
}

h1 {
    width: 100%;
    text-align: center;
}

.step {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 10px;
    min-width: 400px;
    min-height: 60vh;
    overflow-y: auto;
    padding: 20px;
}

label {
    display: flex;
    font-size: 16px;
    color: var(--text-color);
    width: 100%;
}

label i {
    margin-right: 15px;
    min-width: 20px;
}

input {
    padding: 10px;
    width: 100%;
    border: 2px solid var(--border-color);
    border-radius: 5px;
    font-size: 14px;
}

input:focus {
    outline: none;
    border-color: var(--primary-color);
    box-shadow: 0 0 5px rgba(0, 123, 255, 0.5);
}

button {
    padding: 10px 20px;
    background-color: var(--background-color);
    color: var(--button-text-color);
    border: none;
    border-radius: 5px;
    font-size: 16px;
    cursor: pointer;
    transition: background-color 0.3s;
}

label+span {
    color: var(--error-color);
    display: block;
}

button i {
    margin-right: 5px;
}

button:hover {
    background-color: var(--secondary-color);
}

.modal {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.5);
    display: flex;
    justify-content: center;
    align-items: center;
}

.modal-content {
    background: #fff;
    padding: 20px;
    border-radius: 5px;
}

.GeoButtin {
    cursor: pointer;

}

.cord {
    display: flex;

}

.modal button {
    width: 100%;
    margin: auto;
}</style>
