<template>
    <ul class="sibling-list" :style="props.contentStyle">
        <li v-for="(item, index) in items" :key="item.sort" class="sibling-item" :class="`direction-${props.direction}`"
            :style="{ animationDelay: `${props.delay + index * props.interval}s`, animationDuration: `${props.duration}s`, ...props.itemStyle }"
            @click="handleClick(item, index)">
            <slot :item="item" :index="index">
                {{ item.sort }}
            </slot>
        </li>
    </ul>
</template>

<script setup lang="ts" generic="T extends { sort: number | string }">
const props = withDefaults(defineProps<{
    items: T[]
    direction?: 'up' | 'down' | 'left' | 'right'
    duration?: number
    interval?: number
    delay?: number
    contentStyle?: Record<string, string | number>
    itemStyle?: Record<string, string | number>
}>(), {
    direction: 'up',
    duration: 0.5,
    interval: 0.1,
    delay: 0,
    contentStyle: () => ({}),
    itemStyle: () => ({})
})

const emit = defineEmits<{
    (e: 'click', item: T, index: number): void
}>()

const handleClick = (item: T, index: number) => {
    emit('click', item, index)
}
</script>

<style scoped>
.sibling-list {
    list-style: none;
}

.sibling-item {
    cursor: pointer;
    opacity: 0;
    animation: ease forwards;
    transition: all 0.3s ease;
}

.sibling-item:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

/* Up direction */
.direction-up {
    transform: translateY(20px);
    animation-name: fadeInUp;
}

@keyframes fadeInUp {
    to {
        opacity: 1;
        transform: translateY(0);
    }
}

/* Down direction */
.direction-down {
    transform: translateY(-20px);
    animation-name: fadeInDown;
}

@keyframes fadeInDown {
    to {
        opacity: 1;
        transform: translateY(0);
    }
}

/* Left direction */
.direction-left {
    transform: translateX(20px);
    animation-name: fadeInLeft;
}

@keyframes fadeInLeft {
    to {
        opacity: 1;
        transform: translateX(0);
    }
}

/* Right direction */
.direction-right {
    transform: translateX(-20px);
    animation-name: fadeInRight;
}

@keyframes fadeInRight {
    to {
        opacity: 1;
        transform: translateX(0);
    }
}
</style>