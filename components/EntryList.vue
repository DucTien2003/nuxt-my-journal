<script setup lang="ts">
import { ref } from 'vue';
import dayjs from 'dayjs';
import type { Dayjs } from 'dayjs';
import { DeleteFilled } from '@ant-design/icons-vue';
import { message } from 'ant-design-vue';
import type { Entry, Filter } from '~/types';
import { getDate } from '@/utils';

const entryStore = useEntryStore();

// Filter
const filterValue = ref<Dayjs | undefined>(undefined);
const filter = ref<Filter>(undefined);
const showTime = (value: string | Dayjs, dateString: string) => {
  if (typeof value !== 'string') {
    filterValue.value = dayjs(value);
  }
};

// Emotion
const getEmotionUrl = (emotion: number) => {
  return `/emotions/emotion${emotion}.svg`;
};

// Show entry detail
const handleShowEntryDetail = (entry: Entry) => {
  entryStore.changeDate(entry.time);
};

// Delete entry
let deleteAmount = 0;
const handleChecked = (checkedValue: any) => {
  if (checkedValue.target.checked === true) {
    deleteAmount += 1;
  } else {
    deleteAmount -= 1;
  }
};
const handleDeleteEntry = () => {
  entryStore.deleteEntry();
  deleteAmount = 0;
  message.success('Delete successfully', 3);
};
</script>

<template>
  <!-- List entries -->
  <div class="px-4 lg:w-1/3 relative">
    <!-- Filter -->
    <div class="flex items-center justify-between">
      <span class="font-medium text-lg color lg:hidden">Tìm kiếm</span>

      <div class="lg:flex lg:w-full">
        <a-date-picker
          v-model:value="filterValue"
          :picker="filter"
          class="w-40 lg:flex-1"
          :inputReadOnly="true"
          @change="showTime"
        />

        <a-select v-model:value="filter" class="w-24 ml-1">
          <a-select-option value="">Day</a-select-option>
          <a-select-option value="month">Month</a-select-option>
          <a-select-option value="year">Year</a-select-option>
        </a-select>
      </div>
    </div>

    <!-- Actions -->
    <div class="mt-1 flex justify-end">
      <span
        class="flex items-center cursor-pointer text-red-600 font-semibold hover:underline"
        @click="handleDeleteEntry"
      >
        <span class="pt-1 pr-1">Delete({{ deleteAmount }})</span>
        <delete-filled class="text-base" />
      </span>
    </div>

    <!-- Entry list -->
    <div class="entries mt-2 overflow-auto">
      <div
        v-for="(entriesOfYear, indexEntriesOfYear) in entryStore.listFilter(
          filterValue,
          filter
        )"
        :key="indexEntriesOfYear"
      >
        <a-divider orientation="left">
          <span class="text-xl">{{ entriesOfYear.year }}</span>
        </a-divider>

        <div
          v-for="(entry, indexEntry) in entriesOfYear.entries"
          class="color-bg-entry rounded-md mb-3 cursor-pointer relative"
          :class="
            getDate(entry.time) === getDate(dayjs(entryStore.dateValue))
              ? 'selected'
              : ''
          "
          :key="indexEntry"
        >
          <!-- Main -->
          <div class="flex p-2" @click="handleShowEntryDetail(entry)">
            <div class="flex flex-col items-center w-16">
              <div class="flex items-center justify-between w-full">
                <img
                  :src="getEmotionUrl(entry.emotion)"
                  alt="icon"
                  class="w-7"
                />
                <div class="text-xs">{{ entry.time.format('MMM') }}</div>
              </div>

              <div class="text-2xl font-semibold">
                {{ entry.time.date() }}
              </div>

              <div class="text-sm">{{ entry.time.format('ddd') }}</div>
            </div>

            <a-divider type="vertical" class="h-20" />

            <div class="flex flex-col flex-1">
              <div class="limited-line-1 text-lg">
                {{ entry.title }}
              </div>
              <div class="limited-line-2 text-sm mt-1">
                {{ entry.content }}
              </div>
            </div>
          </div>

          <!-- Select box -->
          <div class="absolute top-0 right-0 mr-2 mt-1">
            <a-checkbox
              @change="handleChecked"
              v-model:checked="entry.checked"
            ></a-checkbox>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.color-bg-entry {
  &.selected {
    background-color: rgba($color: #fff9ba, $alpha: 1);
  }

  background-color: rgba($color: #fff9ba, $alpha: 0.5);
}

.limited-line-1 {
  overflow: hidden;
  display: -webkit-box;
  -webkit-line-clamp: 1; /* number of lines to show */
  -webkit-box-orient: vertical;
}

.limited-line-2 {
  overflow: hidden;
  display: -webkit-box;
  -webkit-line-clamp: 2; /* number of lines to show */
  -webkit-box-orient: vertical;
}

.entries {
  height: calc(100vh - 176px);
}
</style>
