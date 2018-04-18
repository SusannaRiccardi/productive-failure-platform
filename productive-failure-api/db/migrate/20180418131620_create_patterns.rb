class CreatePatterns < ActiveRecord::Migration[5.1]
  def change
    create_table :patterns do |t|
      t.string :pattern

      t.timestamps
    end
  end
end
