class RemoveGenerationTwoIdFromProductiveFailures < ActiveRecord::Migration[5.1]
  def change
    remove_column :productive_failures, :generation_two_id, :string
  end
end
