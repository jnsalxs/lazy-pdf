<script setup>
import 'flexboxgrid'
import { useFormStore } from "../stores/formStore";

const store = useFormStore();

const handleSubmit = async (event) => {
  event.preventDefault();

  // Appel de l'API pour générer le PDF
  await fetch('http://localhost:3000/generate-pdf', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(store.formData),
  })
  .then(response => {
    if (response.ok) {
      return response.blob();
    }
    throw new Error('Réponse pas ok');
  })
  .then(blob => {
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', 'justificatif.pdf');
    document.body.appendChild(link);
    link.click();
    link.parentNode.removeChild(link);
  })
  .catch(error => console.error('Erreur:', error));
};
</script>

<template>
    <form @submit.prevent="handleSubmit">
        <div class="row">
            <div class="col-xs-6 col-lg-3">
                <label for="input-radio">Monsieur</label>
                <input v-model="store.formData.gender" name="input-radio" type="radio" value="Monsieur">
            </div>
            <div class="col-xs-6 col-lg-3">
                <label for="input-radio">Madame</label>
                <input v-model="store.formData.gender" name="input-radio" type="radio" value="Madame">
            </div>
        </div>
        <div class="row">
            <div class="col-lg-6 col-xs-12">
                <label for="input-name">Nom</label><br>
                <input v-model="store.formData.name" placeholder="Nom" type="text">
            </div>
            <div class="col-lg-6 col-xs-12">
                <label for="input-firstname">Prénom</label><br>
                <input v-model="store.formData.firstname" name="input-firstname" placeholder="Prénom" type="text">
            </div>
        </div>
        <div class="row">
            <div class="col-lg-12 col-xs-12">
                <label for="reason">Motif</label><br>
                <select v-model="store.formData.reason" name="reason" id="input-select">
                    <option value="Choisissez un motif" >Choisissez un motif</option>
                    <option value="un rhume du genou" >Rhume du genou</option>
                    <option value="une grippe de l'épaule" >Grippe de l'épaule</option>
                    <option value="une entorse au poumon" >Entorse au poumon</option>
                    <option value="une qualfication du psg en 1/4 de finale de LDC" >Qualfication du psg en 1/4 de finale de LDC</option>
                </select>
            </div>
        </div>
        <div class="row">
            <div class="col-lg-6 col-xs-12">
                <label for="start-date">Date début</label><br>
                <input v-model="store.formData.startDate" name="start-date" type="date">
            </div>
            <div class="col-lg-6 col-xs-12">
                <label for="end-date">Date fin</label><br>
                <input v-model="store.formData.endDate" name="end-date" type="date">
            </div>
        </div>
        <div class="row">
            <div class="col-lg-12 col-xs-12 button-container">
                <input id="generate-button" type="submit" value="Générer PDF">
            </div>
        </div>
    </form>
</template>

<style scoped lang="scss">
    form {
        width: 45vw;

        .row {
            margin-bottom: 20px;
        }
    
        input {
            font-family: 'JetbrainsMono_Regular', sans-serif;;
            height: 50px;
            width: 100%;
            border: 2px solid #00000069;
            padding-left: 10px;

            &:focus {
            border: 2px solid #fb6107;
            outline: none; 
            }
        }
        .col-lg-3 {
            display: flex;
            align-items: center;
        
            & input {
                height: 20px;
            }
        }

        select {
            height: 50px;
            width: 100%;
            border: 2px solid #00000069;
            padding-left: 10px;
            font-family: 'JetbrainsMono_Regular', sans-serif;;
        }

        .button-container {
            display: flex;
            justify-content: end;

            #generate-button {
                font-family: 'JetbrainsMono_Regular', sans-serif;
                width: fit-content;
                border: 2px solid transparent;
                background-color: #fb6107;
                color: white;
                font-weight: bold;
                margin-top: 50px;  
                padding: 10px 20px;
                transition: 0.3s;

                &:hover {
                    cursor: pointer;
                    border: 2px solid #fb6107;
                    background-color: transparent;
                    color: #fb6107;
                }
            }
        }
    }

    @media (max-width: 765px) {
        form {
            width: 70vw;
        }
    }

</style>