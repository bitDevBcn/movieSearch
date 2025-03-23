<template>
    <v-dialog v-model="messageStore.showMsg" width="400">
        <v-card>
            <v-card-text>
                <p>{{ messageStore.message }}</p>
            </v-card-text>
        </v-card>
    </v-dialog>
</template>

<script setup lan="ts">
    import { useMessageStore } from '@/stores/message'
    //recuperamos store
    const messageStore = useMessageStore(); 
    
</script>