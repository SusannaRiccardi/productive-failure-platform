# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# Note that this schema.rb definition is the authoritative source for your
# database schema. If you need to create the application database on another
# system, you should be using db:schema:load, not running all the migrations
# from scratch. The latter is a flawed and unsustainable approach (the more migrations
# you'll amass, the slower it'll run and the greater likelihood for issues).
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 20180430074408) do

  create_table "activity_patterns", force: :cascade do |t|
    t.string "productive_failure_id"
    t.string "pattern_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "patterns", force: :cascade do |t|
    t.string "pattern"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "productive_failures", force: :cascade do |t|
    t.string "owner_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "reconstruct_patterns", force: :cascade do |t|
    t.string "productive_failure_id"
    t.string "representation_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "representations", force: :cascade do |t|
    t.string "constraint"
    t.string "svg"
    t.string "productive_failure_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.string "activity_pattern_id"
  end

  create_table "users", force: :cascade do |t|
    t.string "name"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

end
